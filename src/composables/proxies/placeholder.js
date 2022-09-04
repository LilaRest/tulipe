import { watch, getCurrentInstance } from "vue";

export class TulipePlaceholder {

  constructor () {
    this._ars = {}
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
