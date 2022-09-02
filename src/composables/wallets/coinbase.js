import { Wallet } from "./wallet.js";
import { WalletConnectionRejected } from "./errors.js";

export class CoinbaseWallet extends Wallet {

  constructor (CoinbaseWalletSdk, options={}) {
    super();
    this.id = "coinbase";

    // const infuraId = options.infuraId || "";
    const appName = options.appName || "";
    const appLogoUrl = options.appLogoUrl;
    const darkMode = options.darkMode || false;

    // let rpc = options.rpc || undefined;
    // if (options.infuraId && !options.rpc) {
    //   rpc = `https://mainnet.infura.io/v3/${infuraId}`;
    // }

    this.coinbaseWalletSdk = new CoinbaseWalletSdk({
      appName,
      appLogoUrl,
      darkMode
    });

    this.provider = this.getProvider()
  }

  getProvider () {
    try {
      // return this.coinbaseWalletSdk.makeWeb3Provider(this.rpc, this.id);
      return this.coinbaseWalletSdk.makeWeb3Provider();
    }
    catch (e) {
      console.log(e)
      return null;
    }
  }

  async connect () {
    try {
      await this.provider.send("eth_requestAccounts");
    }
    catch (e) {
      throw WalletConnectionRejected(this.id);
    }
  }
}
