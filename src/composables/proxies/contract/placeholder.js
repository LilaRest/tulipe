import { dapp, Status, OnContractReadSafe, OnContractWriteSafe } from "../../../index.js";
import { computed, watch, getCurrentInstance, createVNode } from "vue";
import { ethers } from "ethers";
import { TulipePlaceholder } from "../placeholder.js";

export class TulipeContractPlaceholder extends TulipePlaceholder {

  constructor () {
    // Initialize additional properties.
    this.name = "TODO";

    // Initialize status instance.
    this.status = new Status(`contract:${name}`, [
      "NO_PROVIDER",     // Default status. If not changed it means that app don't have provider.
      "WRONG_PROVIDER",  // Set when contract is not available for the current network.
      "ERROR",           // Set on unknown error during contract initialization.
      "INITIALIZED",     // Set when contract successfuly initialized for the current connect provider.
    ])

    // Initialize safers properties.
    this.isReadSafe = computed(() => {
      return dapp.provider.isSafe.value && this.status.is("INITIALIZED");
    })
    this.isWriteSafe = computed(() => {
      return dapp.signer.isSafe.value && this.status.is("INITIALIZED");
    })
    this.OnReadSafe = createVNode(OnContractReadSafe, {contract: this.name});
    this.OnWriteSafe = createVNode(OnContractWriteSafe, {contract: this.name});
  }

  onSafe (func) {
    throw "TulipeContract instances don't have 'onSafe()' method, use 'onReadSafe()' and 'onWriteSafe()' instead."
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

  _updateContract (address, abi) {
    if (dapp.signer.isSafe.value) {
      this.proxy.ethersInstance = new ethers.Contract(address, abi, dapp.signer.proxy.ethersInstance)
    }
    else if (dapp.provider.isSafe.value) {
      this.proxy.ethersInstance = new ethers.Contract(address, abi, dapp.provider.proxy.ethersInstance)
    }
    else {
      throw `_updateContract() is called for contract ${this.name} but neither provider nor signer are available.`
    }
  }


  _initARS (address, abi) {

    // 1) Auto-update status when provider status is WRONG, DISCONNECTED or in ERROR
    dapp.provider.status.watchAny((status) => {
      if (status === "WRONG") {
        this.status.set("WRONG_PROVIDER");
      }
      else if (["DISCONNECTED", "ERROR"].includes(status)) {
        this.status.set("NO_PROVIDER");
      }
    });

    // 2) Automatically update the contract ethersInstance when the signer changes.
    watch ([dapp.signer.isSafe], (newValue, oldValue) => {
      if (newValue !== oldValue) {
        // Here the contract is removed and then recreated in order to fully destroy the old signer and provider.
        // contract.signer and contract.provider attributes are read-only and it's at the moment the proper solution.
        this.proxy.ethersInstance = null;
        this._updateContract(address, abi);
      }
    })
  }

  async _asyncInit () {

    dapp.provider.onSafe(async function () {
      try {

        // Retrieve current network configurations
        const networkConfig = await dapp.config.networks.getCurrent()

        // If the contract is in the current networks' contracts list, auto-instanciate it.
        if (networkConfig && networkConfig.contracts && Object.keys(networkConfig.contracts).includes(this.name)) {
          const contractConfig = networkConfig.contracts[this.name];
          this._updateContract(contractConfig.address, contractConfig.abi);

          // Initialize contract's ARS
          this._initARS(contractConfig.address, contractConfig.abi);

          this.status.set("INITIALIZED");
        }
        else {
          this.status.set("WRONG_PROVIDER");
        }
      }
      catch (e) {
        this.status.set("ERROR");
        throw e;
      }
    }.bind(this))
  }


}
