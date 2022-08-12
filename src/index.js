import { useDappStore } from "./stores/dapp.js"
import { getActivePinia, createPinia } from "pinia"
import { ethers } from "ethers";
import { vuethersDefaultConfig } from "./vuethers.config-default.js"
import { markRaw } from "vue";

function capitalizeWords (sentence) {
  const words = sentence.split(" ")
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substring(1)
  }
  return words.join(" ");
}

function isObject (item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

function merge (target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, {
          [key]: {}
        });
        merge(target[key], source[key]);
      } else {
        Object.assign(target, {
          [key]: source[key]
        });
      }
    }
  }

  return merge(target, ...sources);
}

export async function initVuethers (app, vuethersCustomConfig) {

  // Ensure Pinia is initialized.
  const activePinia = getActivePinia()
  if (!activePinia) {
    app.use(createPinia())
  }

  // Import the dapp store.
  const dapp = useDappStore()

  // Reload the app on network change. (SECURITY, see : https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes)
  dapp.provider.on("network", (newNetwork, oldNetwork) => {
    if (oldNetwork && oldNetwork !== newNetwork) {
      window.location.reload(); 
    } 
  });

  // Retrieve current networks informations from RPC.
  const currentNetwork = await dapp.provider.getNetwork()

  // Read vuethers.config.js if one is provided.
  if (vuethersCustomConfig) {

    // Merge default and custom config to override default configs by the custom ones
    const vuethersConfig = merge({...vuethersDefaultConfig}, {...vuethersCustomConfig})
    vuethersConfig.networks = []
    for (let network of vuethersCustomConfig.networks) {
      if (network.chainId) {
        const defaultNetwork = vuethersDefaultConfig.networks.find(o => o.chainId === network.chainId)
        network = merge({ ...defaultNetwork }, { ...network });

        // Fill the displayName with the name if not given
        if (!network.displayName) {
          network.displayName = network.name;
        }
        vuethersConfig.networks.push(network);
      }
    }

    // Set the dapp defaults values.
    dapp.defaults = vuethersConfig.defaults

    // Initalize networks.
    if (vuethersConfig.networks) {
      dapp.networks = {
        available: vuethersConfig.networks.filter(o => o.chainId !== currentNetwork.chainId),
        current: vuethersConfig.networks.find(o => o.chainId === currentNetwork.chainId),
        known: vuethersDefaultConfig.networks
      }

      // Initalize current network 
      if (dapp.networks.current && dapp.networks.current.contracts) {

        // Find if a the current signer is valid.
        let isSignerValid = false;
        try {
          await dapp.signer.getAddress()
          isSignerValid = true;
        } catch (e) {}

        // Initialize all the contracts for the current network.
        for (const [name, contract] of Object.entries(dapp.networks.current.contracts)) {

          // Create the contract instance.
          const contractInstance = new ethers.Contract(contract.address, contract.abi, isSignerValid ? dapp.signer : dapp.provider)

          dapp.contracts[name] = markRaw(contractInstance) // Here markRaw is used to fix a Vue 3 problem, see : https://github.com/vuejs/core/issues/3024
        }
      }
      else {
        const networkFromKnown = dapp.networks.known.find(o => o.chainId === currentNetwork.chainId);
        if (networkFromKnown) {
          dapp.networks.current = networkFromKnown;
        }
        else {
          dapp.networks.current = currentNetwork;
          dapp.networks.current.displayName = capitalizeWords(dapp.networks.current.name)
        }
        dapp.status.wallet.setToWrongNetwork()
      }
    }
  }
}

export * from "./components/index.js"
export * from "./stores/index.js"
// export * from "./composables/index.js"
