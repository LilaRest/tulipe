import { markRaw } from "vue";
import { watch, getCurrentInstance } from "vue";


export class TulipeProxy {

  constructor (ethersInstance=null, extensionInstance=null) {

    this._ars = {}

    const proxy = new Proxy(this, {
      get: function(target, prop, receiver) {

        // 1) Try to return the prop from ethersInstance
        if (target.proxy.ethersInstance && target.proxy.ethersInstance[prop] !== undefined) {
          if (typeof target.proxy.ethersInstance[prop] === "function") {
            return target.proxy.ethersInstance[prop].bind(target.proxy.ethersInstance); // This is mandatory, else the proxy will be the bound object of the method
          }
          else {
            return target.proxy.ethersInstance[prop];
          }
        }

        // 2) Try to return the prop from extensionInstance (ethersInstance must exist)
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

        // 3) Try to return the prop from placeholderInstance
        else if (target && target[prop] !== undefined) {
          // If the prop contains a function, bind the Ethers proxy to it.
          if (typeof target[prop] === "function") {
            return target[prop].bind(receiver);
          }

          // Else simply return it.
          else {
            return target[prop];
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
        // else if (target && target[prop] !== undefined) {
        else {
          target[prop] = value;
          return true
        }
        //
        // // Else throw an error
        // else {
        //   console.log(target)
        //   throw `New properties cannot be set on TulipeProxy instances. Please define '${prop}' in constructor firstly.`
        // }
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
        proxy._ars.oldEthersInstance = {...this._ethersInstance}

        // Set the new ethersInstance
        this._ethersInstance = instance ? markRaw(instance) : instance;

        // Re-initialize with the new ethersInstance
        if (!this._initIsRunning) {
          proxy._asyncInit()
        }
      },
      extensionInstance: extensionInstance,
    }
    // this.proxy.ethersInstance = ethersInstance

    return proxy;
  }

  _purgeARS () {
    /*
    ARS is ethersInstance targeted, it means that each time ethersInstance changes
    the ARS is disabled for the old instance and enabled for the new one.
    This _purgeARS() method is called at the top of _initARS() methods in order
    to purge / disable the old ethersInstance ARS.
    */

    // Unwatch watchers
    if (this._ars.unwatchers) {
      for (const unwatch of this._ars.unwatchers) {
        unwatch()
      }
    }
    this._ars.unwatchers = [];

    if (this._ars.oldEthersInstance) {

      // Unlisten events
      if (this._ars.events) {
        for (const [eventName, listener] of Object.entries(this._ars.events)) {
          this._ars.oldEthersInstance.off(eventName, listener)
        }
      }
    }
  }

  _initEthersInstanceARS () {

  }

  _initPlaceholderInstanceARS () {

  }

  _initARS () {
    // 1) Purge old ethersInstance ARS
    this._purgeARS();

    // 2) Init ethersInstance ARS, if there is an ethersInstance
    if (this.proxy.ethersInstance) {
      this._initEthersInstanceARS()
    }

    // 3) Init placeholderInstance ARS
    this._initPlaceholderInstanceARS()
  }

  onSafe (func) {
    const component = getCurrentInstance();
    if (this.isSafe.value) {
      func(component)
    }
    else {
      const unwatch = watch(this.isSafe, () => {
          if (this.isSafe.value) {
              func(component)
              unwatch()
          }
      })
    }
  }
}
