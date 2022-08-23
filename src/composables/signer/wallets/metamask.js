import { Wallet } from "./wallet.js";
import { WalletConnectionRejected } from "./errors.js";

export class MetamaskWallet extends Wallet {
  
  constructor () {
    super();
    this.name = "Metamask";
    this.provider = this.getProvider();
  }

  getProvider () {
   return window.ethereum 
  }

  async connect () {
    try {
      await this.provider.request({ method: 'eth_requestAccounts' })
    } 
    catch (e) {
      if (e.code === 4001) {
        throw WalletConnectionRejected(this.name);
      }
      else {
        throw e
      }
    }
  }
}

