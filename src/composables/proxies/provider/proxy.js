import { TulipeProxy } from "../proxy.js";
import { TulipeProviderExtension } from "./extension.js";
import { TulipeProviderPlaceholder } from "./placeholder.js";


export class TulipeProviderProxy extends TulipeProxy {

  constructor (ethersInstance=null, extensionInstance=null, placeholderInstance=null) {
    super(
      ethersInstance,
      extensionInstance ? extensionInstance : new TulipeProviderExtension(),
      placeholderInstance ? placeholderInstance : new TulipeProviderPlaceholder()
    );

    this._asyncInit();
  }
}
