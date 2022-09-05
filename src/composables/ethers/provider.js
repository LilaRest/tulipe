import { ethers } from "ethers";
import { TulipeProviderProxy } from "../../index.js";

const providerClasses = {
  JsonRpcProvider: ethers.providers.JsonRpcProvider,
  StaticJsonRpcProvider: ethers.providers.StaticJsonRpcProvider,
  EtherscanProvider: ethers.providers.EtherscanProvider,
  InfuraProvider: ethers.providers.InfuraProvider,
  AlchemyProvider: ethers.providers.AlchemyProvider,
  CloudflareProvider: ethers.providers.CloudflareProvider,
  PocketProvider: ethers.providers.PocketProvider,
  AnkrProvider: ethers.providers.AnkrProvider,
  FallbackProvider: ethers.providers.FallbackProvider,
  IpcProvider: ethers.providers.IpcProvider,
  JsonRpcBatchProvider: ethers.providers.JsonRpcBatchProvider,
  UrlJsonRpcProvider: ethers.providers.UrlJsonRpcProvider,
  Web3Provider: ethers.providers.Web3Provider,
  WebSocketProvider: ethers.providers.WebSocketProvider,
}

const tulipeProviderClasses = {}

for (const [providerClassName, providerClass] of Object.entries(providerClasses)) {
  tulipeProviderClasses[providerClassName] = class extends providerClass {
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
}

export { tulipeProviderClasses }
