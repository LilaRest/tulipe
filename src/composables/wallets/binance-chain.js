import { WalletMethodNotImplemented } from "./errors.js";
import { Eip1193Wallet } from "./eip-1193.js";

export class BinanceChainWallet extends Eip1193Wallet {

  constructor () {
    super("binanceChain", window.BinanceChain);
    // Lazy connection is not available for Binance Chain Wallet since the
    // 'eth_accounts' method cannot be requested without trigerring a user
    // approval.
    // See : https://binance-wallet.gitbook.io/binance-chain-wallet/dev/get-started#binancechain.request-method-eth_accounts
    this.lazyConnectAvailable = false;
  }

  async isConnected () {
    throw new WalletMethodNotImplemented(`isConnected() method is not available for BinanceChainWallet class since lazy connection is not available.`)
  }

  async connect (lazy=false) {
    if (lazy) {
      throw new WalletMethodNotImplemented(`connect() with 'lazy=true' is not available for BinanceChainWallet class because isConnected() is not available on this class.`)
    }
  }
}
