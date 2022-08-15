import { watch } from "vue";
import { dapp } from "../index.js";

export default function safeRun(func, args) {
    if (dapp.initialized) {
        func()
    }
    else {
        const unwatch = watch(() => dapp.initialized, () => {
            func()
            unwatch()
        })
    }
}

