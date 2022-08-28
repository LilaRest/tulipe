import { deepMerge } from "../../index.js";
import { vuethersDefaultConfig } from "./vuethers.config-default.js";

export class StyleConfig {

  constructor (customStyleConfig=null) {
    let style = {}
    if (customStyleConfig) {
      style = deepMerge({...vuethersDefaultConfig.style}, {...customStyleConfig})
    }
    else {
      style = vuethersDefaultConfig.style;
    }
    window.addEventListener("load", () => {
      const appDiv = document.getElementsByClassName("ve-app");
      // Apply configured style to mounted app.
      if (appDiv) {
        console.log(appDiv)
        appDiv[0].classList.add(`ve-${style.level}`);
      }
    })
    return style
  }
}
