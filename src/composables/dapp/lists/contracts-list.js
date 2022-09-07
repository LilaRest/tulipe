import { TulipeContractProxy, Status, dapp } from "../../../index.js"
import { computed, watch, getCurrentInstance } from "vue";
import { ethers } from "ethers";

export class ContractsList {

  constructor () {
  }

  init () {
    for (const networkConfig of dapp.config.networks.getAll()) {
      if (networkConfig.contracts) {
        for (const [contractName, contractConfig] of Object.entries(networkConfig.contracts)) {
          this.add(contractName, contractConfig.address, contractConfig.abi);
        }
      }
    }
  }

  add (name, address, abi) {
    const contract = new ethers.Contract(address, abi);
    dapp._ars.contracts.add(name)
    this[name] = new TulipeContractProxy(name, contract);
    // Start contract ARS
    dapp._ars.contracts[name].start()

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
