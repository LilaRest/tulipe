import { EthersObjectProxy } from "./proxy.js";
import { EthersSignerExtension } from "../extensions/signer.js";
import { dapp } from "../../../index.js";
import { computed, watch } from "vue";

export class EthersSignerProxy extends EthersObjectProxy {
  constructor (ethersObject=null) {
    const extensionObject = new EthersSignerExtension() 
    super(ethersObject, extensionObject)
    this.isSafe = computed(() => {
      return dapp.provider.isSafe.value && dapp.status.signer.is("CONNECTED");
    })
  }

  onSafe (func) {
    dapp.provider.onSafe(() => {
        if (this.isSafe.value) {
            func()
        }
        else {
            const unwatch = watch(this.isSafe, () => {
                if (this.isSafe.value) {
                    func()
                    unwatch()
                }
            })
        }
    })
  }
}
