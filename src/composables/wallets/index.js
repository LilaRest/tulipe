import { MetamaskWallet } from "./metamask.js";
import { CoinbaseWallet } from "./coinbase.js";

import { BinanceChainWallet } from "./binance-chain.js";
export const wallets = {
  metamask: MetamaskWallet,
  coinbase: CoinbaseWallet,
  binanceChain: BinanceChainWallet,
}
export { WalletConnectionRejected } from "./errors.js";
