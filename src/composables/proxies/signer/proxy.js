import { TulipeProxy } from "../proxy.js";
import { TulipeSignerExtension } from "./extension.js";

import { dapp, Status, WalletConnectionRejected, OnSignerSafe } from "../../../index.js";
import { TulipePlaceholder } from "../placeholder.js";
import { computed, ref } from "vue";


export class TulipeSignerProxy extends TulipeProxy {

  constructor (ethersInstance=null, extensionInstance=null) {
    super(
      ethersInstance,
      extensionInstance ? extensionInstance : new TulipeSignerExtension(),
    );

    // Initialize additional properties.
    this.walletId = null;
    this.address = ref(null);

    // Aliases of status and safers exposed by ARS
    this.status = dapp._ars.signer.status;
    this.isSafe = dapp._ars.signer.isSafe;
    this.OnSafe = dapp._ars.signer.OnSafe;
    this.onSafe = dapp._ars.signer.onSafe;

    this._asyncInit();
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

  async _autoInstantiate () {
    console.log(dapp.wallets)
    for (const walletId of Object.keys(dapp.wallets)) {
      if (dapp.wallets[walletId].lazyConnectAvailable) {
        await this.connectWallet(walletId, true);
        if (this.proxy.ethersInstance) {
          break;
        }
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
        this.address.value = await this.getAddress();
      }

      // Initialize the signer ARS
      // this._initARS()

      this.proxy._initIsRunning = false;
    }.bind(this))
  }

  async _setSignerDatas (wallet) {

  }

  async connectWallet(walletId, lazy=false) {
    console.log("CONNECT lazy = " + lazy)
    const wallet = dapp.wallets[walletId];

    // Connect lazy.
    if (wallet.lazyConnectAvailable) {
      await wallet.connect(true);

      if (await wallet.isConnected()) {
        dapp.signer.proxy.ethersInstance = await wallet.getSigner();
        this.walletId = wallet.id;
        dapp.signer.status.set("CONNECTED");
      }

      else if (lazy) {
        dapp.signer.status.set("DISCONNECTED")
        return;
      }
    }

    try {
      // Request connection.
      this.status.set("REQUESTED");
      await wallet.connect(false)
      dapp.signer.proxy.ethersInstance = await wallet.getSigner();
      this.walletId = wallet.id;
      dapp.signer.status.set("CONNECTED");
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

  disconnectWallet() {
    dapp.signer.proxy.ethersInstance = null;
    this.address.value = null;
    dapp.signer.status.set("DISCONNECTED")
  }
}
