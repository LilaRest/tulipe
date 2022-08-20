import { EthersObjectProxy } from "./proxy.js";
import { EthersContractExtension } from "../extensions/contract.js";

export class EthersContractProxy extends EthersObjectProxy {
  constructor (ethersObject=null) {
    const extensionObject = new EthersContractExtension() 
    super(ethersObject, extensionObject)
  }

  // isSafe () {

  // }

  // onSafe () {

  // }
}


