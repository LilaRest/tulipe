import { dapp, Status, capitalizeWords, OnProviderSafe } from "../../../index.js";
import { computed, watch, getCurrentInstance } from "vue";
import { ethers } from "ethers";
import { TulipePlaceholder } from "../placeholder.js";


export class TulipeProviderPlaceholder extends TulipePlaceholder {

  constructor () {
    // Initialize status instance.
    this.status = new Status("provider", [
      "DISCONNECTED",  // Default status. Doesn't change if the dapp cannot connect to any provider.
      "WRONG",         // Set when DApp connected to a provider not contained in the available networks.
      "ERROR",         // Set when an error occurs during provider connection.
      "CONNECTED",     // Set when DApp connected to a provider contained in the available networks.
    ])

    // Initialize safers properties.
    this.isSafe = computed(() => {
      return dapp.isSafe.value && !this.status.isIn(["DISCONNECTED", "ERROR"]);
    })
    this.OnSafe = OnProviderSafe;
  }

  _autoInstantiateFromWallet () {
    for (const wallet of Object.values(dapp.wallets)) {
      if (wallet) {
        const walletProvider = wallet.getProvider();
        if (walletProvider) {
          this.proxy.ethersInstance = new ethers.providers.Web3Provider(walletProvider, "any");
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

  _autoInstantiate () {
    // Try to auto-instantiate a Provider instance from informations exposed by wallets
    this._autoInstantiateFromWallet();

    // If ethersInstance is still null, try to auto-instantiate default network in configs.
    if (!this.proxy.ethersInstance) {
      this._autoInstantiateFromDefaultConfig();
    }
  }

  _initARS () {
    // 1) Reload the app on network change. (SECURITY, see : https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes)
    this.on("network", (newNetwork, oldNetwork) => {
      if (oldNetwork && oldNetwork !== newNetwork) {
        window.location.reload();
      }
    });

    // 2) Set status to ERROR on provider error.
    this.on("error", () => {
      this.status.set("ERROR");
    })
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
      this.status.set("WRONG")
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

  async _asyncInit() {
    // If ethersInstance is not given during instantiation, try to automatically
    // create an ethersInstance from informations given by wallets and DApp configs
    if (!this.proxy.ethersInstance) {
      this._autoInstantiate();
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

      // Set the polling interval of the provider instance.
      if (networkConfig && networkConfig.pollingInterval) {
        this.pollingInterval = networkConfig.pollingInterval;
      }

      // Initialize the provider ARS
      this._initARS()
    }
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
