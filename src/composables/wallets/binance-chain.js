import { MetamaskWallet } from "./metamask.js";

export class BinanceChainWallet extends MetamaskWallet {

  constructor () {
    super();
    this.id = "binanceChain";
    this.provider = window.BinanceChain
  }

  // async connect () inherited from MetamaskWallet
  async connect () {
    super.connect.call(this)
  }
}
