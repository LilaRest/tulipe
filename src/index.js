import { useDappStore } from "./stores/dapp.js"
import { getActivePinia, createPinia } from "pinia"
import { ethers } from "ethers";
import { vuethers_default_config } from "./vuethers.config-default.js"
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

export async function initVuethers (app, vuethers_custom_config) {

  // Ensure Pinia is initialized.
  const active_pinia = getActivePinia()
  if (!active_pinia) {
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
  if (vuethers_custom_config) {

    // Merge default and custom config to override default configs by the custom ones
    const vuethers_config = merge({...vuethers_default_config}, {...vuethers_custom_config})
    vuethers_config.networks = []
    for (let network of vuethers_custom_config.networks) {
      if (network.chainId) {
        const default_network = vuethers_default_config.networks.find(o => o.chainId === network.chainId)
        network = merge({ ...default_network }, { ...network });

        // Fill the displayName with the name if not given
        if (!network.displayName) {
          network.displayName = network.name;
        }
        vuethers_config.networks.push(network);
      }
    }

    // Set the dapp defaults values.
    dapp.defaults = vuethers_config.defaults

    // Initalize networks.
    if (vuethers_config.networks) {
      dapp.networks = {
        available: vuethers_config.networks.filter(o => o.chainId !== currentNetwork.chainId),
        current: vuethers_config.networks.find(o => o.chainId === currentNetwork.chainId),
        known: vuethers_default_config.networks
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
