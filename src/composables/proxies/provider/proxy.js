import { TulipeProxy } from "../proxy.js";
import { TulipeProviderExtension } from "./extension.js";
import { TulipeProviderPlaceholder } from "./placeholder.js";


export class TulipeProvider extends TulipeProxy {

  constructor (name, ethersInstance=null, extensionInstance=null, placeholderInstance=null) {
    extensionInstance = extensionInstance ? extensionInstance : new TulipeProviderExtension()
    placeholderInstance = placeholderInstance ? placeholderInstance : new TulipeProviderPlaceholder()
    super(ethersInstance, extensionInstance, placeholderInstance);

    this._asyncInit();
  }
}
