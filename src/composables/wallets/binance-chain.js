import { MetamaskWallet } from "./metamask.js";

export class BinanceChainWallet extends MetamaskWallet {

  constructor () {
    super();
    this.id = "binanceChain";
  }

  getProvider () {
    return window.BinanceChain
  }

  async connect () {
    super.connect.call(this)
  }

  // async connect () inherited from MetamaskWallet
}
