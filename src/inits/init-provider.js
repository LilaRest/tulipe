import { ethers } from "ethers";
import { markRaw } from "vue";
import { dapp, capitalizeWords, Web3Provider } from "../index.js";
import { vuethersDefaultConfig } from "../vuethers.config-default.js";

export default async function initProvider() {

  const webWalletProvider = markRaw(new Web3Provider(window.ethereum, "any"));

  // If the user web wallet provides a network.
  if (webWalletProvider) {

    const networkChainId = await webWalletProvider.getNetwork().then(network => network.chainId)
    let networkConfig = dapp.config.networks.find(o => o.chainId === networkChainId)
    
    // If the current network is valid.
    if (networkConfig) {
      dapp.provider = webWalletProvider;
      dapp.status.network.set("CONNECTED")
    }

    // Else if it's a wrong or unknown network.
    else {
      networkConfig = vuethersDefaultConfig.networks.find(o => o.chainId === networkChainId);

      if (networkConfig) {
        dapp.provider = markRaw(new ethers.providers.JsonRpcProvider(knownNetwork.defaultRPC));

        dapp.status.network.set("WRONG")
      }
      else {
        dapp.provider = webWalletProvider;

        dapp.status.network.set("UNKNOWN")
        // dapp.networks.current.displayName = capitalizeWords(dapp.networks.current.name)
      }
    }

    // Reload the app on network change. (SECURITY, see : https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes)
    webWalletProvider.on("network", (newNetwork, oldNetwork) => {
      if (oldNetwork && oldNetwork !== newNetwork) {
        window.location.reload(); 
      } 
    });

    // Set status to ERROR if the on provider error.
    webWalletProvider.on("error", () => {
      console.log("Provider error !")
      dapp.status.network.set("ERROR");
    })

    // Set the polling interval of the provider.
    if (networkConfig) {
      dapp.provider.pollingInterval = networkConfig.pollingInterval;
    }
  }
  else {
    const defaultNetworkConfig = dapp.config.networks.find(o => o.default === true);
    if (network) {
      dapp.provider = markRaw(new ethers.providers.JsonRpcProvider(defaultNetworkConfig.defaultRPC))
    }
    else {
      dapp.status.network.set("DISCONNECTED");
    }
  }
}

