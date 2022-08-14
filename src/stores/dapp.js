import { Status } from "../index.js"
import { MixedStore } from "../composables/store.js"

const dappStateless = {
  // Will host the content of the DApp config (custom + default vuethers.config.js files)
  config: {},

  // An object that holds all the created Status instances from addStatus().
  status: {
    add: (name, states) => {
      if (Object.keys(dapp.status).includes(name)) {
        throw(`You cannot add a new status called '${name}', this name is either reserved by Vuethers or already existing.`);
      }
      dapp.status[name] = new Status(name, states);
    },
  },
}

const dappStateful = $ref({
  // Ethers.js objects to interact with
  provider: null,
  signer: null,
  contracts: {},
})

export const dapp = new MixedStore({
  config: "stateless",
  status: "stateless",
  networks: "stateless",
  defaults: "stateless",
  provider: "stateful",
  signer: "stateful",
  contracts: "stateful",
}, dappStateless, dappStateful)


