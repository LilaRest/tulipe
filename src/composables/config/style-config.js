import { deepMerge } from "../../index.js";
import { tulipeDefaultConfig } from "./tulipe.config-default.js";

export class StyleConfig {

  constructor (customStyleConfig=null) {
    let style = {}
    if (customStyleConfig) {
      style = deepMerge({...tulipeDefaultConfig.style}, {...customStyleConfig})
    }
    else {
      style = tulipeDefaultConfig.style;
    }
    window.addEventListener("load", () => {
      const appDivs = document.getElementsByClassName("ve-app");
      // Apply configured style to mounted app.
      if (appDivs) {
        for (const appDiv of appDivs) {
          if (appDiv) {
            appDiv.classList.add(`ve-${style.level}`);
          }
        }
      }
    })
    return style
  }
}
