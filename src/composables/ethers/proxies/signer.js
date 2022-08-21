import { EthersObjectProxy } from "./proxy.js";
import { EthersSignerExtension } from "../extensions/signer.js";
import { dapp, Status } from "../../../index.js";
import { computed, watch } from "vue";

export class EthersSignerProxy extends EthersObjectProxy {
  constructor (ethersObject=null) {
    const extensionObject = new EthersSignerExtension() 
    super(ethersObject, extensionObject)
    this.status = new Status("signer", [
      "DISCONNECTED",
      "REQUESTED",
      "REFUSED",
      "ERROR",
      "NOPROVIDER",
      "CONNECTED",
    ]);
    this.isSafe = computed(() => {
      return dapp.provider.isSafe.value && this.status.is("CONNECTED");
    })
  }

  onSafe (func) {
    dapp.provider.onSafe((component) => {
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
