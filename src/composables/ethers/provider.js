import {
  JsonRpcProvider,
  StaticJsonRpcProvider,
  EtherscanProvider,
  InfuraProvider,
  AlchemyProvider,
  CloudflareProvider,
  PocketProvider,
  AnkrProvider,
  FallbackProvider,
  IpcProvider,
  JsonRpcBatchProvider,
  UrlJsonRpcProvider,
  Web3Provider,
  WebSocketProvider
 } from "ethers";

import { TulipeProviderProxy } from "../../index.js";

export class TulipeJsonRpcProvider extends JsonRpcProvider {
  constructor (...args) {

    // Determine proxy class
    let proxyClass = TulipeProviderProxy;
    if (args[args.length - 1].prototype instanceof TulipeProviderProxy) { // Last argument can be a proxy class
      proxyClass = args.pop();
    }

    // Initialize parent constructor.
    super(...args)

    // Build and return proxy.
    const proxy = new proxyClass(this)
    return proxy
  }
}


export class TulipeStaticJsonRpcProvider extends StaticJsonRpcProvider {
  constructor (...args) {

    // Determine proxy class
    let proxyClass = TulipeProviderProxy;
    if (args[args.length - 1].prototype instanceof TulipeProviderProxy) { // Last argument can be a proxy class
      proxyClass = args.pop();
    }

    // Initialize parent constructor.
    super(...args)

    // Build and return proxy.
    const proxy = new proxyClass(this)
    return proxy
  }
}

export class TulipeEtherscanProvider extends EtherscanProvider  {
  constructor (...args) {

    // Determine proxy class
    let proxyClass = TulipeProviderProxy;
    if (args[args.length - 1].prototype instanceof TulipeProviderProxy) { // Last argument can be a proxy class
      proxyClass = args.pop();
    }

    // Initialize parent constructor.
    super(...args)

    // Build and return proxy.
    const proxy = new proxyClass(this)
    return proxy
  }
}

export class TulipeInfuraProvider extends InfuraProvider  {
  constructor (...args) {

    // Determine proxy class
    let proxyClass = TulipeProviderProxy;
    if (args[args.length - 1].prototype instanceof TulipeProviderProxy) { // Last argument can be a proxy class
      proxyClass = args.pop();
    }

    // Initialize parent constructor.
    super(...args)

    // Build and return proxy.
    const proxy = new proxyClass(this)
    return proxy
  }
}

export class TulipeAlchemyProvider extends AlchemyProvider  {
  constructor (...args) {

    // Determine proxy class
    let proxyClass = TulipeProviderProxy;
    if (args[args.length - 1].prototype instanceof TulipeProviderProxy) { // Last argument can be a proxy class
      proxyClass = args.pop();
    }

    // Initialize parent constructor.
    super(...args)

    // Build and return proxy.
    const proxy = new proxyClass(this)
    return proxy
  }
}

export class TulipeCloudflareProvider extends CloudflareProvider  {
  constructor (...args) {

    // Determine proxy class
    let proxyClass = TulipeProviderProxy;
    if (args[args.length - 1].prototype instanceof TulipeProviderProxy) { // Last argument can be a proxy class
      proxyClass = args.pop();
    }

    // Initialize parent constructor.
    super(...args)

    // Build and return proxy.
    const proxy = new proxyClass(this)
    return proxy
  }
}

export class TulipePocketProvider extends PocketProvider  {
  constructor (...args) {

    // Determine proxy class
    let proxyClass = TulipeProviderProxy;
    if (args[args.length - 1].prototype instanceof TulipeProviderProxy) { // Last argument can be a proxy class
      proxyClass = args.pop();
    }

    // Initialize parent constructor.
    super(...args)

    // Build and return proxy.
    const proxy = new proxyClass(this)
    return proxy
  }
}

export class TulipeAnkrProvider extends AnkrProvider  {
  constructor (...args) {

    // Determine proxy class
    let proxyClass = TulipeProviderProxy;
    if (args[args.length - 1].prototype instanceof TulipeProviderProxy) { // Last argument can be a proxy class
      proxyClass = args.pop();
    }

    // Initialize parent constructor.
    super(...args)

    // Build and return proxy.
    const proxy = new proxyClass(this)
    return proxy
  }
}

export class TulipeFallbackProvider extends FallbackProvider  {
  constructor (...args) {

    // Determine proxy class
    let proxyClass = TulipeProviderProxy;
    if (args[args.length - 1].prototype instanceof TulipeProviderProxy) { // Last argument can be a proxy class
      proxyClass = args.pop();
    }

    // Initialize parent constructor.
    super(...args)

    // Build and return proxy.
    const proxy = new proxyClass(this)
    return proxy
  }
}

export class TulipeIpcProvider extends IpcProvider  {
  constructor (...args) {

    // Determine proxy class
    let proxyClass = TulipeProviderProxy;
    if (args[args.length - 1].prototype instanceof TulipeProviderProxy) { // Last argument can be a proxy class
      proxyClass = args.pop();
    }

    // Initialize parent constructor.
    super(...args)

    // Build and return proxy.
    const proxy = new proxyClass(this)
    return proxy
  }
}

export class TulipeJsonRpcBatchProvider extends JsonRpcBatchProvider  {
  constructor (...args) {

    // Determine proxy class
    let proxyClass = TulipeProviderProxy;
    if (args[args.length - 1].prototype instanceof TulipeProviderProxy) { // Last argument can be a proxy class
      proxyClass = args.pop();
    }

    // Initialize parent constructor.
    super(...args)

    // Build and return proxy.
    const proxy = new proxyClass(this)
    return proxy
  }
}

export class TulipeUrlJsonRpcProvider extends UrlJsonRpcProvider  {
  constructor (...args) {

    // Determine proxy class
    let proxyClass = TulipeProviderProxy;
    if (args[args.length - 1].prototype instanceof TulipeProviderProxy) { // Last argument can be a proxy class
      proxyClass = args.pop();
    }

    // Initialize parent constructor.
    super(...args)

    // Build and return proxy.
    const proxy = new proxyClass(this)
    return proxy
  }
}

export class TulipeWeb3Provider extends Web3Provider  {
  constructor (...args) {

    // Determine proxy class
    let proxyClass = TulipeProviderProxy;
    if (args[args.length - 1].prototype instanceof TulipeProviderProxy) { // Last argument can be a proxy class
      proxyClass = args.pop();
    }

    // Initialize parent constructor.
    super(...args)

    // Build and return proxy.
    const proxy = new proxyClass(this)
    return proxy
  }
}

export class TulipeWebSocketProvider extends WebSocketProvider  {
  constructor (...args) {

    // Determine proxy class
    let proxyClass = TulipeProviderProxy;
    if (args[args.length - 1].prototype instanceof TulipeProviderProxy) { // Last argument can be a proxy class
      proxyClass = args.pop();
    }

    // Initialize parent constructor.
    super(...args)

    // Build and return proxy.
    const proxy = new proxyClass(this)
    return proxy
  }
}
