import { StyleConfig } from "./style-config.js";
import { NetworksConfig } from "./networks-config.js";
import { WalletsConfig } from "./wallets-config.js";
import { DefaultsConfig } from "./defaults-config.js";

export class TulipeConfig {
  constructor (tulipeCustomConfig=null) {
    this.style = new StyleConfig(tulipeCustomConfig ? tulipeCustomConfig.style : null);
    this.networks = new NetworksConfig(tulipeCustomConfig ? tulipeCustomConfig.networks : null);
    this.wallets = new WalletsConfig(tulipeCustomConfig ? tulipeCustomConfig.wallets : null);
    this.defaults = new DefaultsConfig(tulipeCustomConfig ? tulipeCustomConfig.defaults: null);
  }
}
