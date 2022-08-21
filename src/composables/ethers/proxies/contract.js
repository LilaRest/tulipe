import { EthersObjectProxy } from "./proxy.js";
import { EthersContractExtension } from "../extensions/contract.js";
import { dapp, Status } from "../../../index.js";
import { computed, watch, getCurrentInstance } from "vue";

export class EthersContractProxy extends EthersObjectProxy {
  constructor (name, ethersObject) {
    const extensionObject = new EthersContractExtension() 
    super(ethersObject, extensionObject)
    this.status = new Status(`contract:${name}`, [
      "NO_PROVIDER",     // Default status. If not changed it means that app don't have provider.
      "WRONG_PROVIDER",  // Set when contract is not available for the current network.
      "ERROR",                 // Set on unknown error during contract initialization.
      "INITIALIZED",           // Set when contract successfuly initialized for the current connect provider.
    ])
    this.isReadSafe = computed(() => {
      return dapp.provider.isSafe.value && this.status.is("INITIALIZED");
    })
    this.isWriteSafe = computed(() => {
      return dapp.signer.isSafe.value && this.status.is("INITIALIZED");
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


