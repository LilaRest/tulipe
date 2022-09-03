import { TulipeProxy } from "../proxy.js";
import { TulipeTransactionProxyExtension } from "./extension.js";
import { TulipeTransactionProxyPlaceholder } from "./placeholder.js";


export class TulipeTransactionProxy extends TulipeProxy {

  constructor (contractName, methodName, args=[], txArgs={value: 0}, ethersInstance=null, extensionInstance=null, placeholderInstance=null) {
    super(
      ethersInstance,
      extensionInstance ? extensionInstance : new TulipeTransactionProxyExtension(),
      placeholderInstance ? placeholderInstance : new TulipeTransactionProxyPlaceholder(contractName, methodName, args=[], txArgs={value: 0})
    );

    this._asyncInit();
  }
}
