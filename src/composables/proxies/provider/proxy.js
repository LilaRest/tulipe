import { TulipeProxy } from "../proxy.js";
import { TulipeProviderExtension } from "./extension.js";
import { dapp, Status, capitalizeWords, OnProviderSafe } from "../../../index.js";
import { TulipePlaceholder } from "../placeholder.js";
import { computed } from "vue";
import { ethers } from "ethers";


export class TulipeProviderProxy extends TulipeProxy {

  constructor (ethersInstance=null, extensionInstance=null) {
    super(
      ethersInstance,
      extensionInstance ? extensionInstance : new TulipeProviderExtension(),
    );

    // Aliases of status and safers exposed by ARS
    this.status = dapp._ars.provider.status;
    this.isSafe = dapp._ars.provider.isSafe;
    this.OnSafe = dapp._ars.provider.OnSafe;
    this.onSafe = dapp._ars.provider.onSafe;

    this._asyncInit();
  }

  async _autoInstantiateFromWallet () {

    // Find if any wallet is already connected in order to retrieve in priority
    // the provider exposed by this wallet.
    let connectedWallet = null;
    for (const wallet of Object.values(dapp.wallets)) {
      if (wallet.lazyConnectAvailable) {
        if (await wallet.isConnected()) {
          connectedWallet = wallet;
          break;
        }
      }
    }
    if (connectedWallet) {
      this.proxy.ethersInstance = connectedWallet.getProvider();
    }

    // Else search if any wallet expose a
    else {
      for (const wallet of Object.values(dapp.wallets)) {
        const provider = wallet.getProvider()
        if (provider) {
          this.proxy.ethersInstance = provider;
        }
      }
    }
  }

  _autoInstantiateFromDefaultConfig () {
    const defaultNetworkConfig = dapp.config.networks.getDefault();
    if (defaultNetworkConfig && defaultNetworkConfig.defaultRPC) {
      this.proxy.ethersInstance = new ethers.providers.JsonRpcProvider(defaultNetworkConfig.defaultRPC);
    }
  }

  async _autoInstantiate () {
    // Try to auto-instantiate a Provider instance from informations exposed by wallets
    await this._autoInstantiateFromWallet();

    // If ethersInstance is still null, try to auto-instantiate default network in configs.
    if (!this.proxy.ethersInstance) {
      this._autoInstantiateFromDefaultConfig();
    }
  }

  async _checkNetwork () {
    if (!this.proxy.ethersInstance) {
      throw `<TulipeProviderProxy instance>._checkNetwork() method must not be called if the ethersInstance is null (if not connected to any network).`
    }

    const networkInfos = await this.getNetwork();
    let networkConfig = await dapp.config.networks.getById(networkInfos.chainId);

    // If network is in available networks (right provider).
    if (networkConfig) {
      this.status.set("CONNECTED")
    }

    // If network not in available networks (wrong provider).
    else {
      this.status.set("WRONG_NETWORK")
      networkConfig = dapp.config.networks.getAll().find(n => n.id === networkInfos.id);

      // If the network in unknown retrieve some informations about it.
      if (!networkConfig) {
        const networkConfig = {
          name: networkInfos.name,
          displayName: capitalizeWords(networkInfos.name),
          id: networkInfos.chainId
        }
        console.log(networkConfig)
        dapp.config.networks.add(networkConfig);
      }
    }
  }

  async _setNetworkSettings () {
    const networkInfos = await this.getNetwork();
    let networkConfig = await dapp.config.networks.getById(networkInfos.chainId);

    if (networkConfig) {
      // Set the polling interval of the provider instance.
      if (networkConfig && networkConfig.pollingInterval) {
        this.pollingInterval = networkConfig.pollingInterval;
      }
    }
  }

  async _asyncInit() {
    this.proxy._initIsRunning = true;

    // If ethersInstance is not given during instantiation, try to automatically
    // create an ethersInstance from informations given by wallets and DApp configs
    if (!this.proxy.ethersInstance) {
      await this._autoInstantiate();
    }

    // If ethersInstance is still null, set status to DISCONNECTED
    if (!this.proxy.ethersInstance) {
      this.status.set("DISCONNECTED");
    }

    // Else, perform some initializations
    else {

      // Check if the network is valid or wrong (if it is in the list of available)
      // networks or not.
      await this._checkNetwork()

      // Set networks settings
      await this._setNetworkSettings()
    }

    this.proxy._initIsRunning = false;
  }

  async changeNetwork(id) {
    let changed = false

    // Try to change wallet's network
    const currentWalletConfig = await dapp.config.wallets.getCurrent()
    if (currentWalletConfig) {
      const result = dapp.wallets[currentWalletConfig.id].changeNetwork(id)
      if (result) {
        changed = true
      }
    }

    // Else force new network in cookies
  }
}
