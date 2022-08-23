import { deepMerge } from "../../index.js";
import { vuethersDefaultConfig } from "./vuethers.config-default.js";

export class DefaultsConfig {

  constructor (customDefaultsConfig=null) {
    let defaults = {}
    if (customDefaultsConfig) {
      defaults = deepMerge({...vuethersDefaultConfig.defaults}, {...customDefaultsConfig})
    }
    else {
      defaults = vuethersDefaultConfig.defaults;
    }
    return defaults
  }
}
