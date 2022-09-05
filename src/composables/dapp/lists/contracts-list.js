import { TulipeContractProxy, Status, dapp } from "../../../index.js"
import { computed, watch, getCurrentInstance } from "vue";

export class ContractsList {

  constructor () {
    for (const networkConfig of dapp.config.networks.getAll()) {
      if (networkConfig.contracts) {
        for (const [contractName, contractConfig] of Object.entries(networkConfig.contracts)) {
          this[contractName] = new dapp.ethers.Contract(contractConfig.address, contractConfig.abi); // Replace by a TulipeLazyContract
          console.log(this[contractName])
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
