import { dapp } from "../../index.js";
import { ChainWatcher } from "./chain-watcher.js";

export class WalletWatcher extends ChainWatcher {
    /*
     * This class allows to watch for multiple kind of datas associated with an on-chain wallet.
    */

    constructor (address) {
        super()
        this.address = address
        this.availableSources = ["balance"]
    }

    async _updateState(source) {
        if (source.name === "balance") {
            source.state.value = await dapp.provider.getBalance(this.address);
        }
    }

    async _update () {

        if (await this.requiresUpdate()) {
            for (const source of Object.values(this.sources)) {
                await this._updateState(source);
            }
            await this.updateLastUpdateBlock();
        }
    }

    add (source, args, callback=null) {
        if (!this.availableSources.includes(source)) {
            throw `Sources added to a ChainWalletWatcher must be in ${this.availableSources}. Got ${source}`
        }
        const sourceName = this._buildSourceName(source, args);

        newSource = false
        if (!Object.keys(this.sources).includes(sourceName)) {
            this.sources[sourceName] = {
                name: source,
                args: args,
                state: ref(null),
                dependents: {},
            }
            newSource = true;
        }

        let unwatch = null;
        if (callback) {
            unwatch = watch(this.sources[sourceName].state, callback)
        }
        const newDependentUUID = this._generateDependentUUID()
        this.sources[sourceName].dependents[newDependentUUID] = unwatch;

        // If new source asynchronously fetch a first value for the state.
        if (newSource) {
            this._updateState(this.sources[sourceName]);
        }

        return newDependentUUID
    }

    remove (source, args, dependentUUID) {
        const sourceName = this._buildSourceName(source, args);

        if (Object.keys(this.sources).includes(sourceName)) {
            if (Object.keys(this.sources[sourceName].dependents).includes(dependentUUID)) {
                // Unwatch callback if there is one.
                const unwatch = this.sources[sourceName].dependents[dependentUUID]
                if (unwatch) {
                    unwatch();
                }
                delete this.sources[sourceName].dependents[dependentUUID]
            }
        }
        if (Object.keys(this.sources[sourceName].dependents).length === 0) {
            delete this.sources[sourceName];
        } 
    }

    getRef (source, args) {
        const sourceName = this._buildSourceName(source, args);
        return this.sources[sourceName].state
    }
}

