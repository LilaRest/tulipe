import { deepMerge } from "../../index.js";
import { tulipeDefaultConfig } from "./tulipe.config-default.js";

export class DefaultsConfig {

  constructor (customDefaultsConfig=null) {
    let defaults = {}
    if (customDefaultsConfig) {
      defaults = deepMerge({...tulipeDefaultConfig.defaults}, {...customDefaultsConfig})
    }
    else {
      defaults = tulipeDefaultConfig.defaults;
    }
    return defaults
  }
}
