import { Eip1193Wallet } from "./eip-1193.js";


export class MetamaskWallet extends Eip1193Wallet {

  constructor () {
    super("metamask", window.ethereum);
  }
}
