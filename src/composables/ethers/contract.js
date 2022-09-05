import { ethers } from "ethers";
import { TulipeContractProxy } from "../../index.js";

const contractClasses = {
  Contract: ethers.Contract,
  // ERC20Contract: ethers.ERC20Contract,
}

const tulipeContractClasses = {}

for (const [contractClassName, contractClass] of Object.entries(contractClasses)) {
  tulipeContractClasses[contractClassName] = class extends contractClass {
    constructor (...args) {

      // Determine proxy class
      let proxyClass = TulipeContractProxy;
      if (args.length > 0 && args[args.length - 1] && args[args.length - 1].prototype instanceof TulipeContractProxy) { // Last argument can be a proxy class
        proxyClass = args.pop();
      }

      // Initialize parent constructor.
      super(...args)

      // Build and return proxy.
      const proxy = new proxyClass(this)
      console.log(proxy)
      return proxy
    }
  }
}

export { tulipeContractClasses }
