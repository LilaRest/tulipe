// Here import use full path because this file is called before src/index.js has been fully run.
import { StatusList } from "../composables/status.js";
import { MixedStore } from "../composables/store.js";
import { ContractsList } from "../composables/ethers/contract.js";

const dappStateless = {
  // Will host the content of the DApp config (custom + default vuethers.config.js files)
  config: {},
  defaults: {},
  networks: {},

  // An object that holds all the created Status instances from addStatus().
  status: new StatusList(),
  _chainWatchers: {},
}

const dappStateful = $ref({
  // Ethers.js objects to interact with
  safe: false,
  provider: null,
  signer: null,
  contracts: new ContractsList(),
})

export const dapp = new MixedStore(dappStateless, $$(dappStateful))

