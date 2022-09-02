import { TulipeProxy } from "../proxy.js";
import { TulipeContractExtension } from "./extension.js";
import { TulipeContractPlaceholder } from "./placeholder.js";


export class TulipeContract extends TulipeProxy {

  constructor (name, ethersInstance=null, extensionInstance=null, placeholderInstance=null) {
    extensionInstance = extensionInstance ? extensionInstance : new TulipeContractExtension()
    placeholderInstance = placeholderInstance ? placeholderInstance : new TulipeContractPlaceholder(name)
    super(ethersInstance, extensionInstance, placeholderInstance);

    this._asyncInit();
  }
}
