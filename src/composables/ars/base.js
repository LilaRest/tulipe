import { getCurrentInstance, watch } from "vue";

export class BaseARS {

  constructor () {
    this._ars = {
      oldEthersInstance: null,
      events: {},
      watchers: {},
    }
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

  _initARS (proxyInstance) {
    // 1) Purge old ethersInstance ARS
    this._purgeARS();

    // 2) Init ethersInstance ARS, if there is an ethersInstance
    if (proxyInstance.proxy.ethersInstance) {
      this._initEthersInstanceARS()
    }

    // 3) Init placeholderInstance ARS
    this._initPlaceholderInstanceARS()
  }

  start (proxyInstance) {
    this._initARS(proxyInstance)
    proxyInstance.proxy.onChange(this._initARS.bind(this, proxyInstance));
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
