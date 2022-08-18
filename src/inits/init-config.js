import { dapp, deepMerge } from "../index.js";
import { vuethersDefaultConfig } from "../vuethers.config-default.js";

async function getCurrentNetworkConfig () {
    const networkChainId = await dapp.provider.getNetwork().then(network => network.chainId)
    return dapp.config.networks.find(o => o.chainId === networkChainId)
}

export default async function initConfig (vuethersCustomConfig=null) {

  // Read vuethers.config.js if one is provided.
  if (vuethersCustomConfig) {
    console.log("AAA")

    // Deep merge default and custom config to override default configs by the custom ones
    const vuethersConfig = deepMerge({...vuethersDefaultConfig}, {...vuethersCustomConfig})

    // Deep merge networks and keep only networks that are explicitely defined in the user's vuethers.config.js file.
    vuethersConfig.networks = []
    for (let network of vuethersCustomConfig.networks) {
      if (network.chainId) {
        const defaultNetwork = vuethersDefaultConfig.networks.find(o => o.chainId === network.chainId)
        network = deepMerge({ ...defaultNetwork }, { ...network });

        // Fill the displayName with the name if not given
        if (!network.displayName) {
          network.displayName = network.name;
        }
        vuethersConfig.networks.push(network);
      }
    }

    // Add the getCurrent() method to the config.networks object (array).
    vuethersConfig.networks.getCurrent = getCurrentNetworkConfig;

    dapp.config = vuethersConfig;
  }
}
