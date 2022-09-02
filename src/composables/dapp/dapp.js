// Here import use full path because this file is called before src/index.js has been fully run.
import { Status, TulipeProvider, TulipeSigner, ContractsList, ChainWatchersList, TulipeConfig, WalletsList, OnDappSafe } from "../../index.js"
import { computed, watch, getCurrentInstance } from "vue";

class Dapp {
  constructor () {
  }

  init (tulipeCustomConfig=null) {
    // Will host the content of the DApp config (custom + default tulipe.config.js files)
    this.config = new TulipeConfig(tulipeCustomConfig)

    // An object that holds all the created Status instances from addStatus().
    this.status = new Status("dapp", [
      "UNSAFE",
      "ERROR",
      "INITIALIZED",
    ]);
    this.isSafe = computed(() => this.status.is("INITIALIZED"))
    this.OnSafe = OnDappSafe;
    this.chainWatchers = new ChainWatchersList()
    this.wallets = new WalletsList();
    this.provider = new TulipeProvider()
    this.pro = this.provider;
    this.signer = new TulipeSigner()
    this.sig = this.signer;
    this.contracts = new ContractsList()
    this.con = this.contracts;
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
