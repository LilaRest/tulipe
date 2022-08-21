import { EthersObjectProxy } from "./proxy.js";
import { EthersProviderExtension } from "../extensions/provider.js";
import { dapp, Status } from "../../../index.js";
import { computed, watch, getCurrentInstance } from "vue";

export class EthersProviderProxy extends EthersObjectProxy {
  constructor (ethersObject=null) {
    const extensionObject = new EthersProviderExtension()
    super(ethersObject, extensionObject)
    this.status = new Status("provider", [
      "DISCONNECTED",  // Default status. Doesn't change if the dapp cannot connect to any provider.
      "WRONG",         // Set when DApp connected to a provider not contained in the available networks.
      "ERROR",         // Set when an error occurs during provider connection.
      "CONNECTED",     // Set when DApp connected to a provider contained in the available networks.
    ])
    this.isSafe = computed(() => {
      return dapp.isSafe.value && !this.status.isIn(["DISCONNECTED", "ERROR"]);
    })
  }


  onSafe (func) {
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
