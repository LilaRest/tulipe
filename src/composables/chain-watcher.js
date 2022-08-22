import { ref } from "vue";
import { dapp } from "../index.js";


export class ChainWatcher {
    constructor (contract) {
        this.contract = contract;
        this.sources = {};
        this.lastUpdateBlock = 0;
    }

    _buildSourceName (source, args) {
        return `${source}:${args ? args.toString() : ""}`;
    }

    _generateDependentUUID() {
        return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    async update (source, args) {
        const currentBlockNumber = await dapp.provider.getBlockNumber();

        if (this.lastUpdateBlock < currentBlockNumber) {

            for (const [sourceName, source] of Object.entries(this.sources)) {
                const oldValue = source.state.value;
                if (source.args) {
                    source.state.value = await this.contract[source.name](...source.args);
                }
                else {
                    source.state.value = await this.contract[source.name]();
                }
                for (const callback of Object.values(source.dependents)) {
                    if (callback) {
                        callback(source.state.value, oldValue);
                    }
                }
            }
            this.lastUpdateBlock = currentBlockNumber;
        }
    }

    add (source, args, callback=null) {
        const sourceName = this._buildSourceName(source, args);
        let requireUpdate = false;
        if (!Object.keys(this.sources).includes(sourceName)) {
            this.sources[sourceName] = {
                name: source,
                args: args,
                state: ref(null),
                dependents: {},
            }
            requireUpdate = true;
        }
        const newDependentUUID = this._generateDependentUUID()
        this.sources[sourceName].dependents[newDependentUUID] = callback ? callback : null;

        if (requireUpdate) {
            const oldValue = this.sources[sourceName].state.value;
            let newValue = null;
            if (args) {
                newValue = this.contract[source](...args);
            }
            else {
                newValue = this.contract[source]();
            }
            newValue.then(value => {
                this.sources[sourceName].state.value = value;
                callback(value, oldValue)
            })
        }

        return newDependentUUID
    }

    remove (source, args, dependentUUID) {
        const sourceName = this._buildSourceName(source, args);
        if (Object.keys(this.sources).includes(sourceName)) {
            if (Object.keys(this.sources[sourceName].dependents).includes(dependentUUID)) {
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
