import { TulipeProxy } from "../proxy.js";
import { TulipeSignerExtension } from "./extension.js";
import { TulipeSignerPlaceholder } from "./placeholder.js";


export class TulipeSigner extends TulipeProxy {

  constructor (name, ethersInstance=null, extensionInstance=null, placeholderInstance=null) {
    extensionInstance = extensionInstance ? extensionInstance : new TulipeSignerExtension()
    placeholderInstance = placeholderInstance ? placeholderInstance : new TulipeSignerPlaceholder()
    super(ethersInstance, extensionInstance, placeholderInstance);

    this._asyncInit();
  }
}
