import { onUnmounted, watch, ref } from "vue";
import { dapp } from "../index.js";

class ChainWatcher {
    constructor (contract) {
        this.contract = contract;
        this.dependents = {}
    }
    
    async update () {
        for (const [source, sourceArgs] of Object.entries(this.dependents)) {
            for (const [argsString, dependant] of Object.entries(sourceArgs)) {
                const oldValue = dependant.value.value;
                dependant.value.value = await this.contract[source](...dependant.args);
                for (const callback of dependant.callbacks) {
                    callback(dependant.value.value, oldValue);
                }
            }
        }
    }

    add (source, args, callback) {
        if (!Object.keys(this.dependents).includes(source)) {
            this.dependents[source] = {}
        }
        if (!Object.keys(this.dependents[source]).includes(args.toString())) {
            this.dependents[source][args.toString()] = {
                callbacks: [],
                args: args,
                value: ref(null),
            }
        }
        this.dependents[source][args.toString()].callbacks.push(callback);
    }
}

export function watchChain(contract, source, args, callback) {
    if (!Object.keys(dapp._watchers).includes(contract.address)) {
        dapp._watchers[contract.address] = new ChainWatcher(contract)
    }
    dapp._watchers[contract.address].add(source, args, callback);
    // onUnmounted(() => unwatch)
}

export function watchChainRef(contract, source, args, callback) {
    if (!Object.keys(dapp._watchers).includes(contract.address)) {
        dapp._watchers[contract.address] = new ChainWatcher(contract)
    }
    dapp._watchers[contract.address].add(source, args, callback);
    // onUnmounted(() => unwatch)
    return refHere
    // Todo : do a function that can be used like that to simply assign a reactive ref that track is updated by a ChainWatcher :
    // const myChainData = watchChainRef(...)
}
