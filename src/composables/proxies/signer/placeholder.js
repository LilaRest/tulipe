import { dapp, Status, WalletConnectionRejected, OnSignerSafe } from "../../../index.js";
import { computed, watch, getCurrentInstance, ref } from "vue";

export class TulipeSignerProxyPlaceholder  {
  constructor () {
    // Initialize additional properties.
    this.address = ref(null);

    // Initialize status instance.
    this.status = new Status("signer", [
      "DISCONNECTED",         // Default status. Not changed if the DApp is not connected to any wallet when loading.
      "REQUESTED",            // Set when a wallet connection request has been sent from the DApp.
      "REFUSED",              // Set during 5 seconds when a wallet connection request has been refused by either the wallet or the user.
      "ERROR",                // Set when an unknown errors occurs during wallet connection.
      "NO_PROVIDER",          // Set when the DApp is not connected to any provider.
      "WRONG_PROVIDER",       // Set when the DApp is connected to a provider that is not in the available providers list.
      "CONNECTED",            // Set when a wallet is successfuly connected.
    ]);

    // Initialize safers properties.
    this.isSafe = computed(() => {
      return dapp.provider.isSafe.value && this.status.is("CONNECTED");
    })
    this.OnSafe = OnSignerSafe;
  }

  _initARS () {
    // 1) Auto-update status when provider status is WRONG, DISCONNECTED or in ERROR
    dapp.provider.status.watchAny((status) => {
      if (status === "WRONG") {
        this.status.set("WRONG_PROVIDER");
      }
      else if (["DISCONNECTED", "ERROR"].includes(status)) {
        this.status.set("NO_PROVIDER");
      }
    });

    // 2) Fallback to DISCONNECTED after few seconds of REFUSED or ERROR status
    this.status.watch(["REFUSED", "ERROR"], () => {
      setTimeout(() => {
        this.status.set("DISCONNECTED");
      }, 5000);
    })
  }

  _autoInstantiate () {
    for (const wallet of Object.values(dapp.wallets)) {
      await thisObject.connectWallet(wallet, true);
    }
  }

  async _asyncInit() {

    // Delay init until provider is safe
    dapp.provider.onSafe(async function () {

      // If ethersInstance is not given during instantiation, try to automatically
      // create an ethersInstance from already connected wallet
      if (!this.proxy.ethersInstance) {
        this._autoInstantiate();
      }

      // If ethersInstance is still null, set status to DISCONNECTED
      if (!this.proxy.ethersInstance) {
        this.status.set("DISCONNECTED");
      }

      // Else, perform some initializations
      else {

        // Initialize the signer ARS
        this._initARS()
      }
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

  async connectWallet(wallet, lazy=false) {

    if (dapp.signer.status.is("DISCONNECTED")) {

      try {
        const signer = await dapp.provider.getSigner();
        const address = await signer.getAddress()
        dapp.signer.proxy.ethersInstance = signer;
        this.address.value = address;
        dapp.signer.status.set("CONNECTED");
      }
      catch (e) {

        // If lazy simply mark the wallet as DISCONNECTED
        if (lazy === true) {
          dapp.signer.status.set("DISCONNECTED")
        }

        else {

          this.status.set("REQUESTED");
          try {
            await wallet.connect();
            this.status.set("CONNECTED");
          }

          catch (e) {
            if (e instanceof WalletConnectionRejected) {
              this.status.set("REFUSED");
            }
            else {
              this.status.set("ERROR");
              throw e;
            }
          }
        }
      }
    }
  }

  disconnectWallet() {
    dapp.signer.proxy.ethersInstance = null;
    this.address.value = null;
    dapp.signer.status.set("DISCONNECTED")
  }
}
