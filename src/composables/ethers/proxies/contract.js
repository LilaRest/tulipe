import { EthersObjectProxy } from "./proxy.js";
import { EthersContractExtension } from "../extensions/contract.js";
import { dapp, Status } from "../../../index.js";
import { computed, watch, getCurrentInstance } from "vue";

export class EthersContractProxy extends EthersObjectProxy {
  constructor (ethersObject) {
    const extensionObject = new EthersContractExtension() 
    super(ethersObject, extensionObject)
    this.status = new Status("", []);
    this.isReadSafe = computed(() => {
      return dapp.provider.isSafe.value && this.status.is("INITIALIZED");
    })
    this.isWriteSafe = computed(() => {
      return dapp.signer.isSafe.value && this.status.is("INITIALIZED");
    })
  }

  onReadSafe (func) {
    const component = getCurrentInstance();
    if (this.isSafe.value) {
        func(component)
    }
    else {
        const unwatch = watch(this.isSafe, () => {
            if (this.isSafe.value) {
                func(component)
                unwatch()
            }
        })
    }
  }

  onWriteSafe (func) {
    const component = getCurrentInstance();
    if (this.isSafe.value) {
        func(component)
    }
    else {
        const unwatch = watch(this.isSafe, () => {
            if (this.isSafe.value) {
                func(component)
                unwatch()
            }
        })
    }
  }
}


