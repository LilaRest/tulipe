import { MetamaskWallet } from "./metamask.js";
import { CoinbaseWallet } from "./coinbase.js";
import { BinanceChainWallet } from "./binance-chain.js";
const wallets = {
  metamask: MetamaskWallet,
  coinbase: CoinbaseWallet,
  binanceChain: BinanceChainWallet,
}
export { wallets };
export { WalletConnectionRejected } from "./errors.js";
export { WalletsList } from "./wallets-list.js";
