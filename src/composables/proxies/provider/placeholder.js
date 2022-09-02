import { dapp, Status, capitalizeWords, OnProviderSafe } from "../../../index.js";
import { computed, watch, getCurrentInstance } from "vue";
import { ethers } from "ethers";


export class TulipeProviderPlaceholder {

  constructor () {

    // Initialize additional properties.
    this.status = new Status("provider", [
      "DISCONNECTED",  // Default status. Doesn't change if the dapp cannot connect to any provider.
      "WRONG",         // Set when DApp connected to a provider not contained in the available networks.
      "ERROR",         // Set when an error occurs during provider connection.
      "CONNECTED",     // Set when DApp connected to a provider contained in the available networks.
    ])
    this.isSafe = computed(() => {
      return dapp.isSafe.value && !this.status.isIn(["DISCONNECTED", "ERROR"]);
    })
    this.OnSafe = OnProviderSafe;
  }

  async _getProviderFromWebWallet () {
    for (const wallet of Object.values(dapp.wallets)) {
      if (wallet) {
        const walletProvider = wallet.getProvider();
        if (walletProvider) {
          return walletProvider;
        }
      }
    }
    return null;
  }

  async _initProviderConnection () {
    // Search if any web wallet exposes a provider.
    const webWalletProvider = await this._getProviderFromWebWallet();
    if (webWalletProvider) {
      this.proxy.ethersInstance = new ethers.providers.Web3Provider(webWalletProvider, "any");
    }

    // If not any provider is exposed by web wallet, try to connect to the default one.
    else {
      const defaultNetworkConfig = dapp.config.networks.getDefault();
      if (defaultNetworkConfig && defaultNetworkConfig.defaultRPC) {
        this.proxy.ethersInstance = new ethers.providers.JsonRpcProvider(defaultNetworkConfig.defaultRPC);
      }
    }
  }

  async _asyncInit() {

    // 1) Connect to provider exposed by web wallet or to default network if there is one.
    await this._initProviderConnection();

    // 2) If not connected to any provider, set status to DISCONNECTED.
    if (!this.proxy.ethersInstance) {
      this.status.set("DISCONNECTED");
    }

    // 3) Else figure if it's a right or wrong provider.
    else {
      const networkInfos = await this.getNetwork();
      let networkConfig = await dapp.config.networks.getAvailable().find(n => n.chainId === networkInfos.chainId);

      // If network is in available networks (right provider).
      if (networkConfig) {
        this.status.set("CONNECTED")
      }

      // If network not in available networks (wrong provider).
      else {
        this.status.set("WRONG")
        networkConfig = dapp.config.networks.getAll().find(n => n.chainId === networkInfos.chainId);

        // If the network in unknown retrieve some informations about it.
        if (!networkConfig) {
          const networkConfig = {
            name: networkInfos.name,
            displayName: capitalizeWords(networkInfos.name),
            chainId: networkInfos.chainId
          }
          dapp.config.network.append(networkConfig);
        }
      }

      // 4) Reload the app on network change. (SECURITY, see : https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes)
      this.on("network", (newNetwork, oldNetwork) => {
        if (oldNetwork && oldNetwork !== newNetwork) {
          window.location.reload();
        }
      });

      // 5) Set status to ERROR if the on provider error.
      this.on("error", () => {
        this.status.set("ERROR");
      })

      // 6) Set the polling interval of the provider.
      if (networkConfig && networkConfig.pollingInterval) {
        this.pollingInterval = networkConfig.pollingInterval;
      }
    }
  }

  // Initialize additional methods.
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
