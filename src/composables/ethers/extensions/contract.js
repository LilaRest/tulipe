import { onUnmounted, getCurrentInstance } from "vue";
import { ChainWatcher, dapp } from "../../../index.js"


export class EthersContractExtension {

  _watch(source, args, callback=null) {
      if (!Object.keys(dapp._chainWatchers).includes(this.address)) {
          dapp._chainWatchers[this.address] = new ChainWatcher(this)
      }
      return dapp._chainWatchers[this.address].add(source, args, callback);
  }

  watch(source, args, callback, component=null) {
    const newDependentUUID = this._watch(source, args, callback);
    const instance = getCurrentInstance();
    if (component) {
      onUnmounted(() => {
        dapp._chainWatchers[this.address].remove(source, args, newDependentUUID);
      }, component)
    }
    else {
      onUnmounted(() => {
        dapp._chainWatchers[this.address].remove(source, args, newDependentUUID);
      })
    }
    return dapp._chainWatchers[this.address].remove.bind(dapp._chainWatchers[this.address], source, args, newDependentUUID);
  }

  watchRef(source, args, component=null) {
    const newDependentUUID = this._watch(source, args, null);
    if (component) {
      onUnmounted(() => {
        dapp._chainWatchers[this.address].remove(source, args, newDependentUUID);
      }, component)
    }
    else {
      onUnmounted(() => {
        dapp._chainWatchers[this.address].remove(source, args, newDependentUUID);
      })
    }
    return dapp._chainWatchers[this.address].getRef(source, args);
  }
}
