import { defineStore } from "pinia";
import { Status } from "../index.js"

export const useDappStore = defineStore("dapp", () => {

  // Will host the content of the DApp config (custom + default vuethers.config.js files)
  const config = {};

  // Ethers.js objects to interact with
  const provider = $ref(null);
  let signer = $ref(null);
  const contracts = {};

  const status = ({
    wallet: new Status("wallet", [
      "DISCONNECTED",
      "REQUESTED",
      "REFUSED",
      "ERROR",
      "CONNECTED"
    ]),
    network: new Status("network", [
      "WRONG",
      "ERROR",
    ]),
  })

  status.wallet.watchStates(["REFUSED", "ERROR"], () => {
    setTimeout(() => {
      status.wallet.set("DISCONNECTED");
    }, 5000)
  })

  // Don't know what to do with them for now.
  let networks = {};

  return $$({ 
    config,
    provider,
    signer,
    contracts,
    status,

    networks,
  })
});

