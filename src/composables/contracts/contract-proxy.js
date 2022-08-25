import { EthersObjectProxy } from "../proxy.js";
import { EthersContractExtension } from "./contract-extension.js";
import { dapp, Status, OnContractReadSafe, OnContractWriteSafe } from "../../index.js";
import { computed, watch, getCurrentInstance, createVNode } from "vue";
import { ethers } from "ethers";

export class EthersContractProxy extends EthersObjectProxy {

  constructor (name, ethersObject) {
    const extensionObject = new EthersContractExtension() 
    super(ethersObject, extensionObject)

    this.name = name;
    this.status = new Status(`contract:${name}`, [
      "NO_PROVIDER",     // Default status. If not changed it means that app don't have provider.
      "WRONG_PROVIDER",  // Set when contract is not available for the current network.
      "ERROR",                 // Set on unknown error during contract initialization.
      "INITIALIZED",           // Set when contract successfuly initialized for the current connect provider.
    ])

    dapp.provider.status.watchAny((status) => {
      if (status === "WRONG") {
        this.status.set("WRONG_PROVIDER");
      }
      else if (["DISCONNECTED", "ERROR"].includes(status)) {
        this.status.set("NO_PROVIDER");
      }
    });

    this.isReadSafe = computed(() => {
      return dapp.provider.isSafe.value && this.status.is("INITIALIZED");
    })

    this.isWriteSafe = computed(() => {
      return dapp.signer.isSafe.value && this.status.is("INITIALIZED");
    })

    this.OnReadSafe = createVNode(OnContractReadSafe, {contract: this.name});
    this.OnWriteSafe = createVNode(OnContractWriteSafe, {contract: this.name});

    this._asyncInit();
  }

  _watchSignerChanges (address, abi) {
    watch ([dapp.signer.isSafe], (newValue, oldValue) => {
      console.log("Refresh contract " + this.name)
      if (newValue !== oldValue) {

        // Here the contract is removed and then recreated in order to fully destroy the old signer and provider.
        // contract.signer and contract.provider attributes are read-only and it's at the moment the proper solution.
        this.proxy.setEthersObject(null);
        this._updateContract(address, abi)
      }
    })
  }
    
  _updateContract (address, abi) {
    if (dapp.signer.isSafe.value) {
      this.proxy.setEthersObject(new ethers.Contract(address, abi, dapp.signer.proxy.getEthersObject()))
    }
    else if (dapp.provider.isSafe.value) {
      this.proxy.setEthersObject(new ethers.Contract(address, abi, dapp.provider.proxy.getEthersObject()))
    }
    else {
      throw `_updateContract() is called for contract ${this.name} but neither provider nor signer are available.`
    }
  }

  async _asyncInit () {

    const thisObject = this; // This is used because the this object is overriden in onSafe context.

    dapp.provider.onSafe(async function () {
      try {
        const networkConfig = await dapp.config.networks.getCurrent()
        
        if (Object.keys(networkConfig.contracts).includes(thisObject.name)) {
          const contractConfig = networkConfig.contracts[thisObject.name];
          thisObject._updateContract(contractConfig.address, contractConfig.abi);
          thisObject._watchSignerChanges(contractConfig.address, contractConfig.abi);
          thisObject.status.set("INITIALIZED");
        }
        else {
          thisObject.status.set("WRONG_PROVIDER");
        }
      }
      catch (e) {
        thisObject.status.set("ERROR");
        throw e;
      }
    })
  }

  onReadSafe (func) {
    const component = getCurrentInstance();
    if (this.isReadSafe.value) {
      func(component)
    }
    else {
      const unwatch = watch(this.isReadSafe, () => {
        if (this.isReadSafe.value) {
            func(component)
            unwatch()
        }
      })
    }
  }

  onWriteSafe (func) {
    const component = getCurrentInstance();
    if (this.isWriteSafe.value) {
      func(component)
    }
    else {
      const unwatch = watch(this.isWriteSafe, () => {
        if (this.isWriteSafe.value) {
            func(component)
            unwatch()
        }
      })
    }
  }
}


