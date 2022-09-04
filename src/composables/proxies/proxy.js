import { markRaw } from "vue";

export class TulipeProxy {

  constructor (ethersInstance=null, extensionInstance=null, placeholderInstance=null) {

    const proxy = new Proxy(this, {
      get: function(target, prop, receiver) {
        // 1) Return value from EthersProxy instance if prop is 'proxy'.
        if (prop === "proxy") {
          return target.proxy;
        }

        // 2) Try to return the prop from ethersInstance
        if (target.proxy.ethersInstance && target.proxy.ethersInstance[prop] !== undefined) {
          if (typeof target.proxy.ethersInstance[prop] === "function") {
            return target.proxy.ethersInstance[prop].bind(target.proxy.ethersInstance); // This is mandatory, else the proxy will be the bound object of the method
          }
          else {
            return target.proxy.ethersInstance[prop];
          }
        }

        // 3) Try to return the prop from extensionInstance (ethersInstance must exist)
        else if (target.proxy.ethersInstance && target.proxy.extensionInstance && target.proxy.extensionInstance[prop] !== undefined) {
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
        else if (target.proxy.placeholderInstance && target.proxy.placeholderInstance[prop] !== undefined) {
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
        if (target.proxy.ethersInstance && target.proxy.ethersInstance[prop] !== undefined) {
          target.proxy.ethersInstance[prop] = value;
          return true
        }

        // 2) Try to set on the extensionInstance
        else if (target.proxy.extensionInstance && target.proxy.extensionInstance[prop] !== undefined) {
          target.proxy.extensionInstance[prop] = value;
          return true
        }

        // 3) Try to set on the placeholderInstance
        else if (target.proxy.placeholderInstance && target.proxy.placeholderInstance[prop] !== undefined) {
          target.proxy.placeholderInstance[prop] = value;
          return true
        }

        // Else throw an error
        else {
          console.log(target.proxy.placeholderInstance)
          console.log(target.proxy.placeholderInstance[prop])
          throw `New properties cannot be set on TulipeProxy instances. Please define '${prop}' in constructor firstly.`
        }
      }
    });

    this.proxy = {
      _initIsRunning: false,
      _ethersInstance: null,
      get ethersInstance () {
        return this._ethersInstance;
      },
      set ethersInstance(instance) {
        // Fill the oldEthersInstance instance used by ARS for purging
        this.placeholderInstance._ars.oldEthersInstance = {...this._ethersInstance}

        // Set the new ethersInstance
        this._ethersInstance = instance ? markRaw(instance) : instance;

        // Re-initialize with the new ethersInstance
        if (!this._initIsRunning) {
          proxy._asyncInit()
        }
      },
      extensionInstance: extensionInstance,
      placeholderInstance: placeholderInstance,
    }
    this.proxy.ethersInstance = ethersInstance

    return proxy;
  }
}
