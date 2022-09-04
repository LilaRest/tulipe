import { dapp, Status, WalletConnectionRejected, OnSignerSafe } from "../../../index.js";
import { TulipePlaceholder } from "../placeholder.js";
import { computed, ref } from "vue";

export class TulipeSignerPlaceholder extends TulipePlaceholder {
  constructor () {
    super();

    // Initialize additional properties.
    this.id = null;
    this.address = ref(null);

    // Initialize status instance.
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

  _initARS () {
    // 1) Purge old ethersInstance ARS
    this._purgeARS()

    // 2) Auto-update status when provider status is WRONG, DISCONNECTED or in ERROR
    this._ars.unwatchers.push(
      dapp.provider.status.watchAny((status) => {
        if (status === "WRONG_NETWORK") {
          this.status.set("WRONG_NETWORK");
        }
        else if (["DISCONNECTED", "ERROR"].includes(status)) {
          this.status.set("NO_PROVIDER");
        }
      })
    )

    // 3) Fallback to DISCONNECTED after few seconds of REFUSED or ERROR status
    this._ars.unwatchers.push(
      this.status.watch(["REFUSED", "ERROR"], () => {
        setTimeout(() => {
          this.status.set("DISCONNECTED");
        }, 5000);
      })
    )
  }

  async _autoInstantiate () {
    for (const walletId of Object.keys(dapp.wallets)) {
      await this.connectWallet(walletId, true);
      if (this.proxy.ethersInstance) {
        break;
      }
    }
  }

  async _asyncInit() {
    this.proxy._initIsRunning = true;

    // Delay init until provider is safe
    dapp.provider.onSafe(async function () {

      // If ethersInstance is not given during instantiation, try to automatically
      // create an ethersInstance from already connected wallet
      if (!this.proxy.ethersInstance) {
        await this._autoInstantiate();
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
      this.proxy._initIsRunning = false;
    }.bind(this))
  }

  async connectWallet(walletId, lazy=false) {
    const wallet = dapp.wallets[walletId];

    if (dapp.signer.status.is("DISCONNECTED")) {

      try {
        const signer = await wallet.getSigner()
        const address = await signer.getAddress()
        dapp.signer.proxy.ethersInstance = signer;
        this.address.value = address;
        this.id = walletId;
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
            console.log(walletId)
            await wallet.connect();
            this.id = walletId;
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
