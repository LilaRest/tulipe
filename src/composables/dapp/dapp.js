// Here import use full path because this file is called before src/index.js has been fully run.
import { TulipeProviderProxy, TulipeSignerProxy, TulipeConfig, ARS } from "../../index.js";
import { ChainWatchersList, WalletsList, ContractsList } from "./lists/index.js";
import { watch, getCurrentInstance } from "vue";

class Dapp {
  constructor () {
  }

  init (tulipeCustomConfig=null) {

    // Will host the content of the DApp config (custom + default tulipe.config.js files)
    this.config = new TulipeConfig(tulipeCustomConfig)

    // Start ARS
    this._ars = new ARS();

    // Aliases of status and safers exposed by ARS
    this.status = this._ars.dapp.status;
    this.isSafe = this._ars.dapp.isSafe;
    this.OnSafe = this._ars.dapp.OnSafe;
    this.onSafe = this._ars.dapp.onSafe;

    // Lists
    this.chainWatchers = new ChainWatchersList()
    this.wallets = new WalletsList();
    this.contracts = new ContractsList()

    // Initialize provider handler
    this.provider = new TulipeProviderProxy()
    this._ars.provider.init()

    // Initialize signer handler
    this.signer = new TulipeSignerProxy()
    this._ars.signer.init()

    // Aliases to makes life easier
    this.pro = this.provider;
    this.sig = this.signer;
    this.con = this.contracts;
  }
}

export const dapp = new Dapp();
