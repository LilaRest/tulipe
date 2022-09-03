import { TulipeProxy } from "../proxy.js";
import { TulipeProviderProxyExtension } from "./extension.js";
import { TulipeProviderProxyPlaceholder } from "./placeholder.js";


export class TulipeProviderProxy extends TulipeProxy {

  constructor (ethersInstance=null, extensionInstance=null, placeholderInstance=null) {
    super(
      ethersInstance,
      extensionInstance ? extensionInstance : new TulipeProviderProxyExtension(),
      placeholderInstance ? placeholderInstance : new TulipeProviderProxyPlaceholder()
    );

    this._asyncInit();
  }
}
