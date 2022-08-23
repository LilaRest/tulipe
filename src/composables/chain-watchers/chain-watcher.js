import { dapp } from "../../index.js";


export class ChainWatcher {

    constructor () {
        this.lastUpdateBlock = 0;
        this.sources = {};
    }

    _generateDependentUUID() {
        return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    async requiresUpdate () {
        if (!dapp.provider.isSafe.value) {
            return false;
        }
        const currentBlockNumber = await dapp.provider.getBlockNumber();
        return this.lastUpdateBlock < currentBlockNumber ? true : false;
    }

    async updateLastUpdateBlock () {
        const currentBlockNumber = await dapp.provider.getBlockNumber();
        this.lastUpdateBlock = currentBlockNumber;
    }

    async _update () {
        throw "_update() method not implemented in that ChainWatcher child class."
    }

    update () {
        /* 
         * This wrapper force calling _update asynchronously and prevent that any user use await on it.
        */
        this._update();
    }
}
