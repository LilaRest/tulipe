import { ethers } from "ethers";
import { dapp, EthersContractProxy } from "../index.js"
import { computed, watch } from "vue";

export class ContractsList {

  constructor () {
    this._contracts = [];
    this.areSafe = computed(() => {
      return dapp.provider.isSafe.value && dapp.status.contracts.is("INITIALIZED");
    })
  }

  add (name, address, abi) {
    if (Object.keys(this).includes(name)) {
      throw(`You cannot add a new contract called '${name}', this name is either reserved by Vuethers or already existing.`);
    }

    if (dapp.signer.isSafe.value) {
      this[name] = new EthersContractProxy(new ethers.Contract(address, abi, dapp.signer.proxy.getEthersObject()));
    } 
    else if (dapp.provider.isSafe.value) {
      this[name] = new EthersContractProxy(new ethers.Contract(address, abi, dapp.provider.proxy.getEthersObject()));
    }
    else {
      throw("A contract is trying to be added from dapp.contract.add() but neither provider nor signer are available.")
    }
    this._contracts.push(name);
  }

  remove (name) {
    if (Object.keys(this).includes(name)) {
      delete this[name];
      this._contracts = this._contracts.filter((item) => item !== name)
    }
  }

  getAll () {
    const all = {}
    for (const contractName of this._contracts) {
      all[contractName] = this[contractName];
    }
    return all;
  }

  onSafe(func) {
    dapp.provider.onSafe(() => {
        if (this.areSafe.value) {
            func()
        }
        else {
            const unwatch = watch(this.areSafe, () => {
                if (this.areSafe.value) {
                    func()
                    unwatch()
                }
            })
        }
    })
  }
}

