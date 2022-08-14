import { defineStore } from "pinia";
import { Status } from "../index.js"

export const useDappStore = defineStore("dapp", () => {

  // Will host the content of the DApp config (custom + default vuethers.config.js files)
  const config = {};

  // Ethers.js objects to interact with
  const provider = $ref(null);
  let signer = $ref(null);
  const contracts = {};

  // An object that holds all the created Status instances from addStatus().
  const status = {}
  function addStatus(name, states) {
    status[name] = new Status(name, states);
  }
  status.add = addStatus;
  
  return $$({ 
    config,
    provider,
    signer,
    contracts,
    status,
  })
});

