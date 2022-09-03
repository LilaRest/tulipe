import { TulipeProxy } from "../proxy.js";
import { TulipeTransactionExtension } from "./extension.js";
import { TulipeTransactionPlaceholder } from "./placeholder.js";


export class TulipeTransactionProxy extends TulipeProxy {

  constructor (contractName, methodName, args=[], txArgs={value: 0}, ethersInstance=null, extensionInstance=null, placeholderInstance=null) {
    super(
      ethersInstance,
      extensionInstance ? extensionInstance : new TulipeTransactionExtension(),
      placeholderInstance ? placeholderInstance : new TulipeTransactionPlaceholder(contractName, methodName, args=[], txArgs={value: 0})
    );

    this._asyncInit();
  }
}
