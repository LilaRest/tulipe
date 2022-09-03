import { TulipeContractProxy, Status, dapp } from "../../index.js"
import { computed, watch, getCurrentInstance } from "vue";

export class ContractsList {

  constructor () {

    for (const networkConfig of dapp.config.networks.getAll()) {
      if (networkConfig.contracts) {
        for (const contractName of Object.keys(networkConfig.contracts)) {
          this[contractName] = new TulipeContractProxy(contractName);
        }
      }
    }
  }

  getAll () {
    const all = {}
    for (const [propName, prop] of Object.entries(this)) {
      if (prop instanceof TulipeContractProxy) {
        all[propName] = prop;
      }
    }
    return all;
  }
}
