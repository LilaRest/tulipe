import { TulipeProxy } from "../proxy.js";
import { TulipeContractExtension } from "./extension.js";
import { dapp, Status, OnContractReadSafe, OnContractWriteSafe } from "../../../index.js";
import { TulipePlaceholder } from "../placeholder.js";
import { computed, watch, getCurrentInstance, createVNode } from "vue";
import { ethers } from "ethers";


export class TulipeContractProxy extends TulipeProxy {

  constructor (ethersInstance=null, extensionInstance=null) {
    super(
      ethersInstance,
      extensionInstance ? extensionInstance : new TulipeContractExtension(),
    );

    // Initialize additional properties.
    this.name = null;

    // Initialize status instance.
    this.status = dapp._ars.contracts[this.name].status;
    this.isReadSafe = dapp._ars.contracts[this.name].isReadSafe;
    this.isWriteSafe = dapp._ars.contracts[this.name].isWriteSafe;
    this.OnReadSafe = dapp._ars.contracts[this.name].OnReadSafe;
    this.OnWriteSafe = dapp._ars.contracts[this.name].OnWriteSafe;
    this.onReadSafe = dapp._ars.contracts[this.name].onReadSafe;
    this.onWriteSafe = dapp._ars.contracts[this.name].onWriteSafe;

    this._asyncInit();
  }

  onSafe (func) {
    throw "TulipeContract instances don't have 'onSafe()' method, use 'onReadSafe()' and 'onWriteSafe()' instead."
  }

  // onReadSafe (func) {
  //   const component = getCurrentInstance();
  //   if (this.isReadSafe.value) {
  //     func(component)
  //   }
  //   else {
  //     const unwatch = watch(this.isReadSafe, () => {
  //       if (this.isReadSafe.value) {
  //           func(component)
  //           unwatch()
  //       }
  //     })
  //   }
  // }
  //
  // onWriteSafe (func) {
  //   const component = getCurrentInstance();
  //   if (this.isWriteSafe.value) {
  //     func(component)
  //   }
  //   else {
  //     const unwatch = watch(this.isWriteSafe, () => {
  //       if (this.isWriteSafe.value) {
  //           func(component)
  //           unwatch()
  //       }
  //     })
  //   }
  // }

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

  // _initEthersInstanceARS () {
  //
  //   // 1) Automatically update the contract ethersInstance when the signer changes.
  //   this._ars.unwatchers.push(
  //     watch(dapp.signer.isSafe, (newValue, oldValue) => {
  //       if (newValue !== oldValue) {
  //         // Here the contract is removed and then recreated in order to fully destroy the old signer and provider.
  //         // contract.signer and contract.provider attributes are read-only and it's at the moment the proper solution.
  //         const abi = this.proxy.ethersInstance.interface
  //         const address = this.proxy.ethersInstance.address
  //         this.proxy.ethersInstance = null;
  //         this._updateContract(address, abi);
  //       }
  //     })
  //   );
  // }
  //
  // _initPlaceholderInstanceARS () {
  //
  //   // 1) Purge old ethersInstance ARS
  //   dapp.provider.status.watchAny((status) => {
  //     if (status === "WRONG_NETWORK") {
  //       this.status.set("UNAVAILABLE");
  //     }
  //     else if (["DISCONNECTED", "ERROR"].includes(status)) {
  //       this.status.set("NO_PROVIDER");
  //     }
  //   })
  // }

  async _asyncInit () {
    console.log("INIT CONTRACT")
    this.proxy._initIsRunning = true;

    // Delay init until provider is safe
    dapp.provider.onSafe(async function () {

      // If ethersInstance is not given during instantiation, set status to UNAVAILABLE
      if (!this.proxy.ethersInstance) {
        this.status.set("UNAVAILABLE");
      }

      // Else, perform some initializations
      else {
        this.name = "TODO"
        this.status.set("INITIALIZED");
      }

      // Initialize the signer ARS
      // this._initARS()

      this.proxy._initIsRunning = false;
    }.bind(this))
  }
}
