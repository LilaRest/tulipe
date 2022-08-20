// Here import use full path because this file is called before src/index.js has been fully run.
import { StatusList } from "./composables/status.js";
// import { MixedStore } from "./composables/store.js";
import { ContractsList } from "./composables/contracts-list.js";
import { EthersProviderProxy, EthersSignerProxy } from "./composables/ethers/proxies/index.js"
import { computed, watch, ref } from "vue";

// const dappStateless = {
class Dapp {
  constructor () {
    // Will host the content of the DApp config (custom + default vuethers.config.js files)
    this.config = {}
    this.defaults = {}
    this.networks = {}

    // An object that holds all the created Status instances from addStatus().
    this._chainWatchers = {}
    this.status = new StatusList()
    this.provider = new EthersProviderProxy()
    this.signer = new EthersSignerProxy()
    this.contracts = new ContractsList()
    this.safe = ref(false)
    this.isSafe = computed(() => this.safe.value)
  }

  onSafe (func) {
    if (this.isSafe.value) {
        func()
    }
    else {
      const unwatch = watch(this.isSafe, () => {
        if (this.isSafe.value) {
          func()
          unwatch()
        }
      })
    }
  }
}

export const dapp = new Dapp();
