import { EthersObjectProxy } from "./proxy.js";
import { EthersSignerExtension } from "../extensions/signer.js";
import { dapp, Status } from "../../../index.js";
import { computed, watch, getCurrentInstance } from "vue";

export class EthersSignerProxy extends EthersObjectProxy {
  constructor (ethersObject=null) {
    const extensionObject = new EthersSignerExtension() 
    super(ethersObject, extensionObject)
    this.status = new Status("signer", [
      "DISCONNECTED",         // Default status. Not changed if the DApp is not connected to any wallet when loading.
      "REQUESTED",            // Set when a wallet connection request has been sent from the DApp.
      "REFUSED",              // Set during 5 seconds when a wallet connection request has been refused by either the wallet or the user.
      "ERROR",                // Set when an unknown errors occurs during wallet connection.
      "NO_PROVIDER",    // Set when the DApp is not connected to any provider.
      "WRONG_PROVIDER", // Set when the DApp is connected to a provider that is not in the available providers list.
      "CONNECTED",            // Set when a wallet is successfuly connected.
    ]);
    this.isSafe = computed(() => {
      return dapp.provider.isSafe.value && this.status.is("CONNECTED");
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
