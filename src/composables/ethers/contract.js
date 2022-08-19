import { ethers } from "ethers";
import { watchChain, watchChainRef, isSignerSafe, isProviderSafe, dapp } from "../../index.js";
import { markRaw } from "vue";

export class Contract extends ethers.Contract {

  constructor (name, address, abi, signerOrProvider) {
    super(address, abi, signerOrProvider);
    this.name = name;
    this.abi = abi;
    return markRaw(this);
  }

  watch = watchChain.bind(null, this)

  watchRef = watchChainRef.bind(null, this)
}

export class ContractsList {

  constructor () {
    this._contracts = [];
  }

  add (name, address, abi) {
    if (Object.keys(this).includes(name)) {
      throw(`You cannot add a new contract called '${name}', this name is either reserved by Vuethers or already existing.`);
    }

    if (isSignerSafe.value) {
      this[name] = new Contract(name, address, abi, dapp.signer)
    } 
    else if (isProviderSafe.value) {
      this[name] = new Contract(name, address, abi, dapp.provider)
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
}

