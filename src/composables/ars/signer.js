import { dapp, Status, OnSignerSafe } from "../../index.js";
import { computed, watch, getCurrentInstance } from "vue";
import { BaseARS } from "./base.js";

export class SignerARS extends BaseARS {

  constructor () {
    super();

    this.status = new Status("signer", [
      "NO_PROVIDER",          // Default, unchanged if dapp.provider is not safe.
      "DISCONNECTED",         // Default status. Not changed if the DApp is not connected to any wallet when loading.
      "REQUESTED",            // Set when a wallet connection request has been sent from the DApp.
      "REFUSED",              // Set during 5 seconds when a wallet connection request has been refused by either the wallet or the user.
      "ERROR",                // Set when an unknown errors occurs during wallet connection.
      "WRONG_NETWORK",        // Set when the DApp is connected to a provider that is not in the available providers list.
      "CONNECTED",            // Set when a wallet is successfuly connected.
    ]);

    // Initialize safers properties.
    this.isSafe = computed(() => {
      return dapp.provider.isSafe.value && this.status.is("CONNECTED");
    })
    this.OnSafe = OnSignerSafe;
  }

  _initEthersInstanceARS () {

  }

  _initPlaceholderInstanceARS () {
    // 1) Auto-update status when provider status is WRONG, DISCONNECTED or in ERROR
    dapp.provider.status.watchAny((status) => {
      if (status === "WRONG_NETWORK") {
        this.status.set("WRONG_NETWORK");
      }
      else if (["DISCONNECTED", "ERROR"].includes(status)) {
        this.status.set("NO_PROVIDER");
      }
    })

    // 2) Fallback to DISCONNECTED after few seconds of REFUSED or ERROR status
    this.status.watch(["REFUSED", "ERROR"], () => {
      setTimeout(() => {
        this.status.set("DISCONNECTED");
      }, 5000);
    })
  }

  start () {
    super.start(dapp.signer);
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
