import {
  Contract,
  ERC20Contract
 } from "ethers";

import { TulipeContractProxy } from "../../index.js";

export class TulipeContract extends Contract {
  constructor (...args) {

    // Determine proxy class
    let proxyClass = TulipeContractProxy;
    if (args[args.length - 1].prototype instanceof TulipeContractProxy) { // Last argument can be a proxy class
      proxyClass = args.pop();
    }

    // Initialize parent constructor.
    super(...args)

    // Build and return proxy.
    const proxy = new proxyClass(this)
    return proxy
  }
}

export class TulipeERC20Contract  extends ERC20Contract  {
  constructor (...args) {

    // Determine proxy class
    let proxyClass = TulipeContractProxy;
    if (args[args.length - 1].prototype instanceof TulipeContractProxy) { // Last argument can be a proxy class
      proxyClass = args.pop();
    }

    // Initialize parent constructor.
    super(...args)

    // Build and return proxy.
    const proxy = new proxyClass(this)
    return proxy
  }
}
