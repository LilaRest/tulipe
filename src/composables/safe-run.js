import { watch, computed } from "vue";
import { dapp } from "../index.js";

const dapp.isSafe = computed(() => {
    return dapp.safe
})

function dapp.onSafe(func) {
    if (dapp.isSafe.value) {
        func()
    }
    else {
        const unwatch = watch(dapp.isSafe, () => {
            if (dapp.isSafe.value) {
                func()
                unwatch()
            }
        })
    }
}

const dapp.provider.isSafe = computed(() => {
    return dapp.isSafe.value && !dapp.status.provider.is("DISCONNECTED");
})


function dapp.provider.onSafe(func) {
    dapp.onSafe(() => {
        if (dapp.provider.isSafe.value) {
            func()
        }
        else {
            const unwatch = watch(dapp.provider.isSafe, () => {
                if (dapp.provider.isSafe.value) {
                    func()
                    unwatch()
                }
            })
        }
    })
}

const dapp.signer.isSafe = computed(() => {
    return dapp.provider.isSafe.value && dapp.status.signer.is("CONNECTED");
})

function dapp.signer.onSafe(func) {

    dapp.provider.onSafe(() => {
        if (dapp.signer.isSafe.value) {
            func()
        }
        else {
            const unwatch = watch(dapp.signer.isSafe, () => {
                if (dapp.signer.isSafe.value) {
                    func()
                    unwatch()
                }
            })
        }
    })
}

const dapp.contracts.areSafe = computed(() => {
    return dapp.provider.isSafe.value && dapp.status.contracts.is("INITIALIZED");
})

function dapp.contracts.onSafe(func) {

    dapp.provider.onSafe(() => {
        if (dapp.contracts.areSafe.value) {
            func()
        }
        else {
            const unwatch = watch(dapp.contracts.areSafe, () => {
                if (dapp.contracts.areSafe.value) {
                    func()
                    unwatch()
                }
            })
        }
    })
}

export { dapp.isSafe, dapp.onSafe, dapp.provider.isSafe, dapp.provider.onSafe, dapp.signer.isSafe, dapp.signer.onSafe, dapp.contracts.areSafe, dapp.contracts.onSafe };
