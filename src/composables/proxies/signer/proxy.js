import { TulipeProxy } from "../proxy.js";
import { TulipeSignerExtension } from "./extension.js";
import { TulipeSignerPlaceholder } from "./placeholder.js";


export class TulipeSignerProxy extends TulipeProxy {

  constructor (ethersInstance=null, extensionInstance=null, placeholderInstance=null) {
    super(
      ethersInstance,
      extensionInstance ? extensionInstance : new TulipeSignerExtension(),
      placeholderInstance ? placeholderInstance : new TulipeSignerPlaceholder()
    );

    this._asyncInit();
  }
}
