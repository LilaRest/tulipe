import { dapp, deepMerge } from "../../index.js";
import { tulipeDefaultConfig } from "./tulipe.config-default.js";

export class WalletsConfig {
  constructor (customWalletsConfig=null) {
    this._list = []

    // Merge custom wallets config with the default ones.
    if (customWalletsConfig) {
      for (const customWallet of customWalletsConfig) {
        if (customWallet.name) {
          const defaultWallet = tulipeDefaultConfig.wallets.find(o => o.name === customWallet.name)
          const wallet = deepMerge({ ...defaultWallet }, { ...customWallet });
          if (wallet.available !== false) {
            wallet.available = true;
          }

          // Fill the displayName with the name if not given
          if (!wallet.displayName) {
            wallet.displayName = wallet.name;
          }
          this._list.push(wallet);
        }
      }
    }

    // Add wallets not given in custom config as not available.
    for (const defaultWallet of tulipeDefaultConfig.wallets) {
      const customWallet = this._list.find(w => w.name === defaultWallet.name);
      if (!customWallet) {
        defaultWallet.available = false;
        this._list.push(defaultWallet);
      }
    }
  }

  async getCurrent () {
    if (dapp.signer.getEthersObject()) {
      const walletName = dapp.signer.name         // TODO : ensure this is the right way to get the wallet name.
      return this._list.find(o => o.name === walletName)
    }
    return null;
  }

  getDefault () {
    return this._list.find(o => o.default === true)
  }

  getAvailable () {
    return this._list.filter(o => o.available)
  }

  getAll () {
    return this._list;
  }
}

