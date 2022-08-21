// Here import use full path because this file is called before src/index.js has been fully run.
import { Status } from "./composables/status.js";
import { ContractsList } from "./composables/ethers/contracts-list.js";
import { EthersProviderProxy, EthersSignerProxy } from "./composables/ethers/proxies/index.js"
import { computed, watch, getCurrentInstance } from "vue";

// const dappStateless = {
class Dapp {
  constructor () {
    // Will host the content of the DApp config (custom + default vuethers.config.js files)
    this.config = {}
    this.defaults = {}
    this.networks = {}

    // An object that holds all the created Status instances from addStatus().
    this._chainWatchers = {}
    this.status = new Status("dapp", [
      "UNSAFE",
      "SAFE"
    ]);
    this.provider = new EthersProviderProxy()
    this.signer = new EthersSignerProxy()
    this.contracts = new ContractsList()
    this.isSafe = computed(() => this.status.is("SAFE"))
  }

  onSafe (func) {
    // Note : Component is passed to the executed function in orders to allows it to use lifecycle hook on this one. Because by default any asynchronous call in a component makes it loss the component instance's context which makes impossible to use lifecycle hooks or any actions related to the component. If a lifecycle hook is called without an attached component, a warning will be raised ("xxx is called when there is no active component instance to be associated with") and will just no work.
    // So while dapp.onSafe() is the first elements in the chain of safers, we can here retrieve the current instance before any asynchronous call.
    const component = getCurrentInstance();
    if (this.isSafe.value) {
      func(component)
    }
    else {
      const unwatch = watch(this.isSafe, () => {
        if (this.isSafe.value) {
          func(component)
          unwatch()
        }
      })
    }
  }
}

export const dapp = new Dapp();
