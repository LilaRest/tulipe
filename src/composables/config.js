import { dapp, deepMerge } from "../index.js";
import { vuethersDefaultConfig } from "../vuethers.config-default.js";

export class VuethersConfig {
  constructor (vuethersCustomConfig=null) {

    this.providers = [];
    if (vuethersCustomConfig && vuethersCustomConfig.providers) {
      for (const customProvider of vuethersCustomConfig.providers) {
        if (customProvider.chainId) {
          const defaultProvider = vuethersDefaultConfig.providers.find(o => o.chainId === customProvider.chainId)
          const provider = deepMerge({ ...defaultProvider }, { ...customProvider });
          if (provider.available !== false) {
            provider.available = true;
          }

          // Fill the displayName with the name if not given
          if (!provider.displayName) {
            provider.displayName = provider.name;
          }
          this.providers.push(provider);
        }
      }
    }

    // Add the getCurrent() method to the config.networks object (array).
    this.providers.getCurrent = this._getCurrentProvider;
    this.providers.getDefault = this._getDefaultProvider;
    this.providers.getAvailable = this._getAvailableProviders;
    this.providers.getAll = this._getAllProviders;

    this.defaults = {}
    if (vuethersCustomConfig && vuethersCustomConfig.defaults) {
      this.defaults = deepMerge({...vuethersDefaultConfig.defaults}, {...vuethersCustomConfig.defaults})
    }
    else {
      this.defaults = vuethersDefaultConfig.defaults;
    }

  }

  async _getCurrentProvider () {
    const providerChainId = await dapp.provider.getNetwork().then(provider => provider.chainId)
    return dapp.config.providers.find(o => o.chainId === providerChainId)
  }

  _getDefaultProvider () {
    return dapp.config.providers.find(o => o.default === true)
  }

  async _getAvailableProviders () {
    const currentProvider = await this.getCurrent();
    return dapp.config.providers.filter(o => o.available && o !== currentProvider)
  }

  _getAllProviders () {
    return dapp.config.providers
  }
}
