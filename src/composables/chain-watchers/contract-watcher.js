import { ChainWatcher } from "./chain-watcher.js";
import { ref, watch } from "vue";

export class ContractWatcher extends ChainWatcher {

    constructor (contract) {
        super()
        this.contract = contract;
    }

    _buildSourceName (source, args) {
        return `${source}:${args ? args.toString() : ""}`;
    }

    async _updateState(source) {
        if (source.args) {
            source.state.value = await this.contract[source.name](...source.args);
        }
        else {
            source.state.value = await this.contract[source.name]();
        }
    }


    async _update () {

        if (await this.requiresUpdate()) {
            for (const source of Object.values(this.sources)) {
                this._updateState(source);
            }
            await this.updateLastUpdateBlock();
        }
    }

    add (source, args, callback=null) {
        const sourceName = this._buildSourceName(source, args);

        let newSource = false
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

