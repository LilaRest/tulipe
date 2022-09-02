import { TulipeProxy } from "../proxy.js";
import { TulipeTransactionExtension } from "./extension.js";
import { TulipeTransactionPlaceholder } from "./placeholder.js";


export class TulipeTransaction extends TulipeProxy {

  constructor (contractName, methodName, args=[], txArgs={value: 0}, ethersInstance=null, extensionInstance=null, placeholderInstance=null) {
    extensionInstance = extensionInstance ? extensionInstance : new TulipeTransactionExtension()
    placeholderInstance = placeholderInstance ? placeholderInstance : new TulipeTransactionPlaceholder(contractName, methodName, args=[], txArgs={value: 0})
    super(ethersInstance, extensionInstance, placeholderInstance);

    this._asyncInit();
  }
}
