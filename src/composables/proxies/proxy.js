import { markRaw } from "vue";

export class TulipeProxy {

  constructor (ethersInstance=null, extensionInstance=null, placeholderInstance=null) {

    this.proxy = {
      _ethersInstance: ethersInstance ? markRaw(ethersInstance) : ethersInstance,
      get ethersInstance () {
        return this._ethersInstance;
      },
      set ethersInstance(instance) {
        this._ethersInstance = instance ? markRaw(instance) : instance;
      },
      extensionInstance: extensionInstance,
      placeholderInstance: placeholderInstance,
    }

    return new Proxy(this, {
      get: function(target, prop, receiver) {
        // 1) Return value from EthersProxy instance if prop is 'proxy'.
        if (prop === "proxy") {
          return target.proxy;
        }

        // 2) Try to return the prop from ethersInstance
        if (target.proxy.ethersInstance && target.proxy.ethersInstance[prop]) {
          if (typeof target.proxy.ethersInstance[prop] === "function") {
            return target.proxy.ethersInstance[prop].bind(target.proxy.ethersInstance); // This is mandatory, else the proxy will be the bound object of the method
          }
          else {
            return target.proxy.ethersInstance[prop];
          }
        }

        // 3) Try to return the prop from extensionInstance (ethersInstance must exist)
        else if (target.proxy.ethersInstance && target.proxy.extensionInstance && target.proxy.extensionInstance[prop]) {
          // If the prop contains a function, bind the Ethers proxy to it.
          if (typeof target.proxy.extensionInstance[prop] === "function") {
            return target.proxy.extensionInstance[prop].bind(receiver);
          }

          // Else simply return it.
          else {
            return target.proxy.extensionInstance[prop];
          }
        }

        // 4) Try to return the prop from placeholderInstance
        else if (target.proxy.placeholderInstance && target.proxy.placeholderInstance[prop]) {
          // If the prop contains a function, bind the Ethers proxy to it.
          if (typeof target.proxy.placeholderInstance[prop] === "function") {
            return target.proxy.placeholderInstance[prop].bind(receiver);
          }

          // Else simply return it.
          else {
            return target.proxy.placeholderInstance[prop];
          }
        }
        return undefined
      },
      set: function(target, prop, value, receiver) {

        // 1) Try to set on the ethersInstance
        if (target.proxy.ethersInstance && target.proxy.ethersInstance[prop]) {
          target.proxy.ethersInstance[prop] = value;
          return true
        }

        // 2) Try to set on the extensionInstance
        else if (target.proxy.extensionInstance && target.proxy.extensionInstance[prop]) {
          target.proxy.extensionInstance[prop] = value;
          return true
        }

        // 3) Try to set on the placeholderInstance
        else if (target.proxy.placeholderInstance && target.proxy.placeholderInstance[prop]) {
          target.proxy.placeholderInstance[prop] = value;
          return true
        }

        // Else throw an error
        else {
          throw "New properties cannot be set on TulipeProxy instances. Please define them in instances constructor firstly."
        }
      }
    });
  }
}
