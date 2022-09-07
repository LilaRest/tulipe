import { dapp } from "../../index.js";
import { ContractARS } from "./contract.js";



export class ContractsARS {

  constructor (name) {
    for (const networkConfig of dapp.config.networks.getAll()) {
      if (networkConfig.contracts) {
        for (const [contractName, contractConfig] of Object.entries(networkConfig.contracts)) {
          this.add(contractName)
        }
      }
    }
  }

  add (name) {
    // TODO ensure unicity
    this[name] = new ContractARS(name);
  }
}
