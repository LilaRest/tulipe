import { wallets, dapp } from "../../../index.js";

export class WalletsList {

    constructor() {
        const availableWalletsConfigs = dapp.config.wallets.getAvailable();
        for (const walletConfig of availableWalletsConfigs) {
            const walletClass = wallets[walletConfig.name];
            if (walletClass) {
              this[walletConfig.name] = new walletClass();
            }
        }
  }
}
