import { onUnmounted, watch, ref } from "vue";
import { dapp } from "../index.js";

export class ChainWatcher {
    constructor (contract) {
        this.contract = contract;
        this.sources = {};
        this.lastUpdateBlock = 0;
    }

    _buildSourceName (source, args) {
        return `${source}:${args.toString}`;
    }

    async update () {
        const currentBlockNumber = await dapp.provider.getBlockNumber();

        if (this.lastUpdateBlock < currentBlockNumber) {

            for (const [sourceName, source] of Object.entries(this.sources)) {
                const oldValue = source.state.value;
                source.state.value = await this.contract[source.name](...source.args);
                for (const callback of source.callbacks) {
                    callback(source.state.value, oldValue);
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
                callbacks: []
            }
            this.contract[source](...args)
                .then((value) => {
                    this.sources[sourceName].state.value = value;
                });
        }
        if (callback) {
            if (!this.sources[sourceName].callbacks.includes(callback)) {
                this.sources[sourceName].callbacks.push(callback);
            }
        }
        return this.sources[sourceName].state
    }

    remove (source, args, callback) {
        const sourceName = this._buildSourceName(source, args);

        if (!Object.keys(this.sources).includes(sourceName)) {
            this.sources[sourceName].callbacks = this.sources[sourceName].callbacks.filter(func => func !== callback);
        }
    }

    getRef (source, args) {
        const sourceName = this._buildSourceName(source, args);
        return this.sources[sourceName].state
    }
}
