import { dapp, deepMerge } from "../../index.js";
import { tulipeDefaultConfig } from "./tulipe.config-default.js";

export class NetworksConfig {
  constructor (customNetworksConfig=null) {
    this._list = []

    // Merge custom networks config with the default ones.
    if (customNetworksConfig) {
      for (const customNetwork of customNetworksConfig) {
        if (customNetwork.id) {
          const defaultNetwork = tulipeDefaultConfig.networks.find(o => o.id === customNetwork.id)
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
      const customNetwork = this._list.find(n => n.id === defaultNetwork.id);
      if (!customNetwork) {
        defaultNetwork.available = false;
        this._list.push(defaultNetwork);
      }
    }
  }

  add (networkConfig) {
    this._list.push(networkConfig)
  }

  async getCurrent () {
    if (dapp.provider.proxy.ethersInstance) {
      const networkId = await dapp.provider.getNetwork().then(network => network.chainId)
      return this.getById(networkId)
    }
    return null;
  }

  getById (id) {
    try {
      id = parseInt(id)
    }
    catch (e) {
      throw "'id' given to getById() method must be an integer or any data type that can be parsed to interger."
    }
    return this._list.find(o => o.id === parseInt(id))
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
