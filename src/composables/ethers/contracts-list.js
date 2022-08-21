import { ethers } from "ethers";
import { EthersContractProxy, Status, dapp } from "../../index.js"
import { computed, watch, getCurrentInstance } from "vue";

export class ContractsList {

  constructor (dapp) {
    this.status = new Status("contracts", [
      "NO_PROVIDER",
      "WRONG_PROVIDER",
      "ERROR",
      "INITIALIZED",
    ])

    for (const configuredProvider of dapp.config.providers) {
      if (configuredProvider.contracts) {
        for (const [contractName, contract] of Object.entries(configuredProvider.contracts)) {
          this[contractName] = new EthersContractProxy(contractName);
        }
      }
    }
    this.areReadSafe = computed(() => {
      return dapp.provider.isSafe.value && this.status.is("INITIALIZED"); 
    })
    this.areWriteSafe = computed(() => {
      return dapp.signer.isSafe.value && this.status.is("INITIALIZED"); 
    })

  }

  add (name, address, abi) {
    if (Object.keys(this).includes(name)) {
      if (!this[name] instanceof EthersContractProxy) {
        throw(`You cannot add a new contract called '${name}', this name is reserved by Vuethers.`);
      }
      else {
        if (dapp.signer.isSafe.value) {
          this[name].proxy.setEthersObject(new ethers.Contract(address, abi, dapp.signer.proxy.getEthersObject()))
        }
        else if (dapp.provider.isSafe.value) {
          this[name].proxy.setEthersObject(new ethers.Contract(address, abi, dapp.provider.proxy.getEthersObject()))
        }
        else {
          throw("A contract is trying to be added from dapp.contract.add() but neither provider nor signer are available.")
        }
      }
    }
    else {
      if (dapp.signer.isSafe.value) {
        this[name] = new EthersContractProxy(new ethers.Contract(address, abi, dapp.signer.proxy.getEthersObject()));
      } 
      else if (dapp.provider.isSafe.value) {
        this[name] = new EthersContractProxy(new ethers.Contract(address, abi, dapp.provider.proxy.getEthersObject()));
      }
      else {
        throw("A contract is trying to be added from dapp.contract.add() but neither provider nor signer are available.")
      }
    }
  }

  remove (name) {
    if (Object.keys(this).includes(name)) {
      delete this[name];
    }
  }

  getAll () {
    const all = {}
    for (const [propName, prop] of Object.entries(this)) {
      if (prop instanceof EthersContractProxy) {
        all[propName] = prop;
      }
    }
    return all;
  }

  onReadSafe(func) {
    const component = getCurrentInstance();
    if (this.areReadSafe.value) {
        func(component)
    }
    else {
        const unwatch = watch(this.areReadSafe, () => {
            if (this.areReadSafe.value) {
                func(component)
                unwatch()
            }
        })
    }
  }

  onWriteSafe(func) {
    const component = getCurrentInstance();
    if (this.areWriteSafe.value) {
        func(component)
    }
    else {
        const unwatch = watch(this.areWriteSafe, () => {
            if (this.areWriteSafe.value) {
                func(component)
                unwatch()
            }
        })
    }
  }
}

