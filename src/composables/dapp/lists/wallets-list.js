import { wallets, dapp } from "../../../index.js";

export class WalletsList {

    constructor() {
        const availableWalletsConfigs = dapp.config.wallets.getAvailable();
        for (const walletConfig of availableWalletsConfigs) {
            const walletClass = wallets[walletConfig.id];
            if (walletClass) {
              this[walletConfig.id] = new walletClass();
            }
        }
  }
}
