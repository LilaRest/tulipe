import { TulipeProxy } from "../proxy.js";
import { TulipeContractProxyExtension } from "./extension.js";
import { TulipeContractProxyPlaceholder } from "./placeholder.js";


export class TulipeContractProxy extends TulipeProxy {

  constructor (name, ethersInstance=null, extensionInstance=null, placeholderInstance=null) {
    super(
      ethersInstance,
      extensionInstance ? extensionInstance : new TulipeContractProxyExtension(),
      placeholderInstance ? placeholderInstance : new TulipeContractProxyPlaceholder(name)
    );

    this._asyncInit();
  }
}

const contract = new Contract(address, abi, signerOrProvider);
const proxy = new TulipeContractProxy(contract)
