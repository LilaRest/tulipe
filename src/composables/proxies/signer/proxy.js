import { TulipeProxy } from "../proxy.js";
import { TulipeSignerProxyExtension } from "./extension.js";
import { TulipeSignerProxyPlaceholder } from "./placeholder.js";


export class TulipeSignerProxy extends TulipeProxy {

  constructor (name, ethersInstance=null, extensionInstance=null, placeholderInstance=null) {
    super(
      ethersInstance,
      extensionInstance ? extensionInstance : new TulipeSignerProxyExtension(),
      placeholderInstance ? placeholderInstance : new TulipeSignerProxyPlaceholder()
    );

    this._asyncInit();
  }
}
