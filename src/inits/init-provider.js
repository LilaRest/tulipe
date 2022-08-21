import { ethers } from "ethers";
import { dapp, capitalizeWords } from "../index.js";

export default async function initProvider() {

  try {
    dapp.provider.proxy.setEthersObject(new ethers.providers.Web3Provider(window.ethereum, "any"));
  }
  catch (e) {
    console.log(e);
    dapp.provider.status.set("ERROR");
  }

  // If the user web wallet provides a network.
  if (dapp.provider._ethersObject) {

    const providerInfos = await dapp.provider.getNetwork()
    let providerConfig = await dapp.config.providers.find(o => o.chainId === providerInfos.chainId)

    // If the current network is in available providers list.
    if (providerConfig) {
      dapp.provider.status.set("CONNECTED")
    }

    // Else if it's a wrong or unknown network.
    else {
      dapp.provider.status.set("WRONG")

      providerConfig = dapp.config.providers.getAll().find(o => o.chainId === providerInfos.chainId);

      // If it's a wrong network (known but not available in that DApp) do nothing.
      // Or if it's an unknown network (unknown and not available in that DApp) retrieve some informations about the network.
      if (!providerConfig) {
        const wrongProviderConfig = {
          name: providerInfos.name,
          displayName: capitalizeWords(providerInfos.name),
          chainId: providerInfos.chainId
        }
        dapp.config.providers.append(wrongProviderConfig);
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
      dapp.provider.status.set("ERROR");
    })

    // Set the polling interval of the provider.
    if (providerConfig && providerConfig.pollingInterval) {
      dapp.provider.pollingInterval = providerConfig.pollingInterval;
    }
  }
  else {
    const defaultProviderConfig = dapp.config.providers.getDefault();
    if (defaultProviderConfig && defaultProviderConfig.defaultRPC) {
      dapp.provider.proxy.setEthersObject(new ethers.providers.JsonRpcProvider(defaultProviderConfig.defaultRPC));
      dapp.provider.status.set("CONNECTED");
    }
    else {
      dapp.provider.status.set("DISCONNECTED");
    }
  }
}
