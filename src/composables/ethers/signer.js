import {
  Wallet,
  VoidSigner,
  JsonRpcSigner
 } from "ethers";

import { TulipeSignerProxy } from "../../index.js";

export class TulipeWallet extends Wallet {
  constructor (...args) {

    // Determine proxy class
    let proxyClass = TulipeSignerProxy;
    if (args[args.length - 1].prototype instanceof TulipeSignerProxy) { // Last argument can be a proxy class
      proxyClass = args.pop();
    }

    // Initialize parent constructor.
    super(...args)

    // Build and return proxy.
    const proxy = new proxyClass(this)
    return proxy
  }
}

export class TulipeVoidSigner extends VoidSigner {
  constructor (...args) {

    // Determine proxy class
    let proxyClass = TulipeSignerProxy;
    if (args[args.length - 1].prototype instanceof TulipeSignerProxy) { // Last argument can be a proxy class
      proxyClass = args.pop();
    }

    // Initialize parent constructor.
    super(...args)

    // Build and return proxy.
    const proxy = new proxyClass(this)
    return proxy
  }
}

export class TulipeJsonRpcSigner extends JsonRpcSigner {
  constructor (...args) {

    // Determine proxy class
    let proxyClass = TulipeSignerProxy;
    if (args[args.length - 1].prototype instanceof TulipeSignerProxy) { // Last argument can be a proxy class
      proxyClass = args.pop();
    }

    // Initialize parent constructor.
    super(...args)

    // Build and return proxy.
    const proxy = new proxyClass(this)
    return proxy
  }
}
