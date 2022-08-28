import { StyleConfig } from "./style-config.js";
import { NetworksConfig } from "./networks-config.js";
import { WalletsConfig } from "./wallets-config.js";
import { DefaultsConfig } from "./defaults-config.js";

export class VuethersConfig {
  constructor (vuethersCustomConfig=null) {
    this.style = new StyleConfig(vuethersCustomConfig ? vuethersCustomConfig.style : null);
    this.networks = new NetworksConfig(vuethersCustomConfig ? vuethersCustomConfig.networks : null);
    this.wallets = new WalletsConfig(vuethersCustomConfig ? vuethersCustomConfig.wallets : null);
    this.defaults = new DefaultsConfig(vuethersCustomConfig ? vuethersCustomConfig.defaults: null);
  }
}
