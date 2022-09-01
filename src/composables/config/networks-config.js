import { dapp, deepMerge } from "../../index.js";
import { tulipeDefaultConfig } from "./tulipe.config-default.js";

export class NetworksConfig {
  constructor (customNetworksConfig=null) {
    this._list = []

    // Merge custom networks config with the default ones.
    if (customNetworksConfig) {
      for (const customNetwork of customNetworksConfig) {
        if (customNetwork.chainId) {
          const defaultNetwork = tulipeDefaultConfig.networks.find(o => o.chainId === customNetwork.chainId)
          const network = deepMerge({ ...defaultNetwork }, { ...customNetwork });
          if (network.available !== false) {
            network.available = true;
          }

          // Fill the displayName with the name if not given
          if (!network.displayName) {
            network.displayName = network.name;
          }
          this._list.push(network);
        }
      }
    }

    // Add networks not given in custom config as not available.
    for (const defaultNetwork of tulipeDefaultConfig.networks) {
      const customNetwork = this._list.find(n => n.chainId === defaultNetwork.chainId);
      if (!customNetwork) {
        defaultNetwork.available = false;
        this._list.push(defaultNetwork);
      }
    }
  }

  async getCurrent () {
    if (dapp.provider.proxy.getEthersObject()) {
      const networkChainId = await dapp.provider.getNetwork().then(network => network.chainId)
      return this._list.find(o => o.chainId === networkChainId)
    }
    return null;
  }

  getDefault () {
    return this._list.find(o => o.default === true)
  }

  getAvailable () {
    return this._list.filter(o => o.available)
  }

  getAll () {
    return this._list;
  }
}

