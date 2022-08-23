// Here import use full path because this file is called before src/index.js has been fully run.
import { Status, EthersProviderProxy, EthersSignerProxy, ContractsList, ChainWatchersList, VuethersConfig, WalletsList } from "./index.js"
import { computed, watch, getCurrentInstance } from "vue";

class Dapp {
  constructor () {
  }

  init (vuethersCustomConfig=null) {
    // Will host the content of the DApp config (custom + default vuethers.config.js files)
    this.config = new VuethersConfig(vuethersCustomConfig)

    // An object that holds all the created Status instances from addStatus().
    this.status = new Status("dapp", [
      "UNSAFE",
      "ERROR",
      "INITIALIZED",
    ]);
    this.isSafe = computed(() => this.status.is("INITIALIZED"))
    this.chainWatchers = new ChainWatchersList()
    this.wallets = new WalletsList();
    this.provider = new EthersProviderProxy()
    this.signer = new EthersSignerProxy()
    this.contracts = new ContractsList()
  }

  onSafe (func) {
    // Note : Component is passed to the executed function in orders to allows it to use lifecycle hook on this one. Because by default any asynchronous call in a component makes it loss the component instance's context which makes impossible to use lifecycle hooks or any actions related to the component. If a lifecycle hook is called without an attached component, a warning will be raised ("xxx is called when there is no active component instance to be associated with") and will just no work.
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
