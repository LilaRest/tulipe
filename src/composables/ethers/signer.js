import { ethers } from "ethers";
import { TulipeSignerProxy } from "../../index.js";

const signerClasses = {
  Wallet: ethers.Wallet,
  VoidSigner: ethers.VoidSigner,
  // JsonRpcSigner: ethers.JsonRpcSigner,
}

const tulipeSignerClasses = {}

for (const [signerClassName, signerClass] of Object.entries(signerClasses)) {
  tulipeSignerClasses[signerClassName] = class extends signerClass {
    constructor (...args) {

      // Determine proxy class
      let proxyClass = TulipeSignerProxy;
      if (args.length > 0 && args[args.length - 1] && args[args.length - 1].prototype instanceof TulipeSignerProxy) { // Last argument can be a proxy class
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

export { tulipeSignerClasses }
