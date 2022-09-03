import { TulipeProxy } from "../proxy.js";
import { TulipeContractExtension } from "./extension.js";
import { TulipeContractPlaceholder } from "./placeholder.js";


export class TulipeContractProxy extends TulipeProxy {

  constructor (name, ethersInstance=null, extensionInstance=null, placeholderInstance=null) {
    super(
      ethersInstance,
      extensionInstance ? extensionInstance : new TulipeContractExtension(),
      placeholderInstance ? placeholderInstance : new TulipeContractPlaceholder(name)
    );

    this._asyncInit();
  }
}

const contract = new Contract(address, abi, signerOrProvider);
const proxy = new TulipeContractProxy(contract)
