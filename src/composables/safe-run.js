import { watch } from "vue";
import { dapp } from "../index.js";

export default function safeRun(func, args) {
    if (dapp.safe) {
        func()
    }
    else {
        const unwatch = watch(() => dapp.safe, () => {
            func()
            unwatch()
        })
    }
}

