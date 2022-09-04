import { dapp, deepMerge } from "../../index.js";
import { tulipeDefaultConfig } from "./tulipe.config-default.js";

export class WalletsConfig {
  constructor (customWalletsConfig=null) {
    this._list = []

    // Merge custom wallets config with the default ones.
    if (customWalletsConfig) {
      for (const customWallet of customWalletsConfig) {
        if (customWallet.id) {
          const defaultWallet = tulipeDefaultConfig.wallets.find(o => o.id === customWallet.id)
          const wallet = deepMerge({ ...defaultWallet }, { ...customWallet });
          if (wallet.available !== false) {
            wallet.available = true;
          }

          // Fill the displayName with the name if not given
          if (!wallet.displayName) {
            wallet.displayName = wallet.id;
          }
          this._list.push(wallet);
        }
      }
    }

    // Add wallets not given in custom config as not available.
    for (const defaultWallet of tulipeDefaultConfig.wallets) {
      const customWallet = this._list.find(w => w.id === defaultWallet.id);
      if (!customWallet) {
        defaultWallet.available = false;
        this._list.push(defaultWallet);
      }
    }
  }

  getCurrent () {
    console.log("GET CURRENT, id = " + dapp.signer.id)
    if (dapp.signer.proxy.ethersInstance) {
      return this.getById(dapp.signer.id)
    }
    return null;
  }

  getById (id) {
    return this._list.find(o => o.id === id)
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
