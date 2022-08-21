import { ethers } from "ethers";
import { dapp, capitalizeWords, EthersProviderProxy } from "../index.js";
import { vuethersDefaultConfig } from "../vuethers.config-default.js";

export default async function initProvider() {

  dapp.provider.proxy.setEthersObject(new ethers.providers.Web3Provider(window.ethereum, "any"));

  // If the user web wallet provides a network.
  if (dapp.provider._ethersObject) {

    const networkChainId = await dapp.provider.getNetwork().then(network => network.chainId)
    let networkConfig = dapp.config.networks.find(o => o.chainId === networkChainId)

    // If the current network is valid.
    if (networkConfig) {
      dapp.provider = dapp.provider;
      dapp.provider.status.set("CONNECTED")
    }

    // Else if it's a wrong or unknown network.
    else {
      networkConfig = vuethersDefaultConfig.networks.find(o => o.chainId === networkChainId);

      if (networkConfig) {
        dapp.provider = dapp.provider.proxy.setEthersObject(new ethers.providers.JsonRpcProvider(knownNetwork.defaultRPC));

        dapp.provider.status.set("WRONG")
      }
      else {
        dapp.provider = dapp.provider;

        dapp.provider.status.set("UNKNOWN")
        // dapp.networks.current.displayName = capitalizeWords(dapp.networks.current.name)
      }
    }

    // Reload the app on network change. (SECURITY, see : https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes)
    dapp.provider.on("network", (newNetwork, oldNetwork) => {
      if (oldNetwork && oldNetwork !== newNetwork) {
        window.location.reload();
      }
    });

    // Set status to ERROR if the on provider error.
    dapp.provider.on("error", () => {
      console.log("Provider error !")
      dapp.provider.status.set("ERROR");
    })

    // Set the polling interval of the provider.
    if (networkConfig) {
      dapp.provider.pollingInterval = networkConfig.pollingInterval;
    }
  }
  else {
    const defaultNetworkConfig = dapp.config.networks.find(o => o.default === true);
    if (network) {
      dapp.provider = dapp.provider.proxy.setEthersObject(new ethers.providers.JsonRpcProvider(defaultNetworkConfig.defaultRPC))
    }
    else {
      dapp.provider.status.set("DISCONNECTED");
    }
  }
}
