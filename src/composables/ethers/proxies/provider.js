import { EthersObjectProxy } from "./proxy.js";
import { EthersProviderExtension } from "../extensions/provider.js";
import { dapp, Status } from "../../../index.js";
import { computed, watch } from "vue";

export class EthersProviderProxy extends EthersObjectProxy {
  constructor (ethersObject=null) {
    const extensionObject = new EthersProviderExtension()
    super(ethersObject, extensionObject)
    this.status = new Status("provider", [
      "DISCONNECTED",
      "WRONG",
      "UNKNOWN",
      "ERROR",
      "CONNECTED",
    ])
    this.isSafe = computed(() => {
      return dapp.isSafe.value && !this.status.is("DISCONNECTED");
    })
  }


  onSafe (func) {
    dapp.onSafe((component) => {
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
    })
  }
}
