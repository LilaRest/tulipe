import { onUnmounted } from "vue";
import { ChainWatcher, dapp } from "../../../index.js"

export class EthersContractExtension {

  _watch(source, args, callback=null) {
      if (!Object.keys(dapp._chainWatchers).includes(this.address)) {
          dapp._chainWatchers[this.address] = new ChainWatcher(this)
      }
      dapp._chainWatchers[this.address].add(source, args, callback);
  }

  watch(source, args, callback) {
    this._watch(source, args, callback);
    onUnmounted(() => dapp._chainWatchers[this.address].remove(source, args, callback))
    return dapp._chainWatchers[this.address].remove.bind(dapp._chainWatchers[this.address], source, args, callback);
  }

  watchRef(source, args) {
      this._watch(source, args, null);
      return dapp._chainWatchers[this.address].getRef(source, args);
  }
}

