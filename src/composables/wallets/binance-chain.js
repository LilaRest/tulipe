import { Eip1193Wallet } from "./eip-1193.js";

export class BinanceChainWallet extends Eip1193Wallet {

  constructor () {
    super("binanceChain", window.BinanceChain);
  }
  
  async getSigner () {
    if (this.provider) {
      // const ethersProvider = this.getEthersProvider()
      return await this.provider.getSigner();
    }
    return null
  }

  // async connect () inherited from MetamaskWallet
  // async connect () {
  //   super.connect.call(this)
  // }
}
