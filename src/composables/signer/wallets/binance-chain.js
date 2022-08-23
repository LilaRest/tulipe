import { MetamaskWallet } from "./metamask.js";

export class BinanceChainWallet extends MetamaskWallet {

  constructor () {
    super();
    this.name = "BinanceChain";
  }

  getProvider () {
    return window.BinanceChain
  }

  // async connect () inherited from MetamaskWallet
}

