import { ref } from "vue";
import { dapp } from "../index.js";


export class ChainWatcher {
    constructor (contract) {
        this.contract = contract;
        this.sources = {};
        this.lastUpdateBlock = 0;
    }

    _buildSourceName (source, args) {
        return `${source}:${args.toString()}`;
    }

    _generateDependentUUID() {
        return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    async update () {
        const currentBlockNumber = await dapp.provider.getBlockNumber();

        if (this.lastUpdateBlock < currentBlockNumber) {

            for (const [sourceName, source] of Object.entries(this.sources)) {
                const oldValue = source.state.value;
                source.state.value = await this.contract[source.name](...source.args);
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
        if (!Object.keys(this.sources).includes(sourceName)) {
            this.sources[sourceName] = {
                name: source,
                args: args,
                state: ref(null),
                dependents: {},
            }
            this.contract[source](...args)
                .then((value) => {
                    this.sources[sourceName].state.value = value;
                });
        }
        const newDependentUUID = this._generateDependentUUID()
        this.sources[sourceName].dependents[newDependentUUID] = callback ? callback : null;
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
