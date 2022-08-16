import { Status } from "../index.js"
import { MixedStore } from "../composables/store.js"
import { ethers } from "ethers";
import { markRaw, watch, ref } from "vue";


const dappStateless = {
  // Will host the content of the DApp config (custom + default vuethers.config.js files)
  config: {},
  defaults: {},
  networks: {},

  // An object that holds all the created Status instances from addStatus().
  status: {
    add: (name, states) => {
      if (Object.keys(dapp.status).includes(name)) {
        throw(`You cannot add a new status called '${name}', this name is either reserved by Vuethers or already existing.`);
      }
      dapp.status[name] = new Status(name, states);
    },
  },
  _watchers: {

  },
}

const dappStateful = $ref({
  // Ethers.js objects to interact with
  initialized: false,
  provider: null,
  signer: null,
  contracts: {
    _contracts: [],
    add: (name, address, abi) => {
      if (Object.keys(dapp.contracts).includes(name)) {
        throw(`You cannot add a new contract called '${name}', this name is either reserved by Vuethers or already existing.`);
      }

      let contractInstance = null;
      try {
        contractInstance = new ethers.Contract(address, abi, dapp.signer)
      } 
      catch (e) {
        contractInstance = new ethers.Contract(address, abi, dapp.provider)
      }

      dapp.contracts[name] = markRaw(contractInstance) // Here markRaw is used to fix a Vue 3 problem, see : https://github.com/vuejs/core/issues/3024
      dapp.contracts._contracts.push(name)

      watch (() => dapp.signer, () => {
        console.log("refresh signer of " + name);
        try {
          dapp.contracts[name].connect(dapp.signer);
        } 
        catch (e) {
          console.log("error while refreshing")
          console.log(e)
          dapp.contracts[name].connect(dapp.provider);
        }
      })
    },
    getAll: () => {
      const all = {}
      for (const contractName of dapp.contracts._contracts) {
        all[contractName] = dapp.contracts[contractName];
      }
      return all;
    }
  },
})

export const dapp = new MixedStore(dappStateless, $$(dappStateful))

