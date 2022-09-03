import { onUnmounted } from "vue";
import { dapp } from "../../index.js"


export class TulipeContractProxyExtension {

  _watch(source, args, callback=null) {
      if (!Object.keys(dapp.chainWatchers.contracts).includes(this.address)) {
          dapp.chainWatchers.addContractWatcher(this);
      }
      return dapp.chainWatchers.contracts[this.address].add(source, args, callback);
  }

  watch(source, args, callback, component=null) {
    const newDependentUUID = this._watch(source, args, callback);
    if (component) {
      onUnmounted(() => {
        dapp.chainWatchers.contracts[this.address].remove(source, args, newDependentUUID);
      }, component)
    }
    else {
      onUnmounted(() => {
        dapp.chainWatchers.contracts[this.address].remove(source, args, newDependentUUID);
      })
    }
    return dapp.chainWatchers.contracts[this.address].remove.bind(dapp.chainWatchers.contracts[this.address], source, args, newDependentUUID);
  }

  watchRef(source, args, component=null) {
    const newDependentUUID = this._watch(source, args, null);
    if (component) {
      onUnmounted(() => {
        dapp.chainWatchers.contracts[this.address].remove(source, args, newDependentUUID);
      }, component)
    }
    else {
      onUnmounted(() => {
        dapp.chainWatchers.contracts[this.address].remove(source, args, newDependentUUID);
      })
    }
    return dapp.chainWatchers.contracts[this.address].getRef(source, args);
  }
}
