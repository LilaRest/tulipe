import { EthersObjectProxy } from "./proxy.js";
import { EthersProviderExtension } from "../extensions/provider.js";
import { dapp } from "../../../index.js";
import { computed, watch } from "vue";

export class EthersProviderProxy extends EthersObjectProxy {
  constructor (ethersObject=null) {
    const extensionObject = new EthersProviderExtension()
    super(ethersObject, extensionObject)
    this.isSafe = computed(() => {
      return dapp.isSafe.value && !dapp.status.provider.is("DISCONNECTED");
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
