import { watch, computed } from "vue";
import { dapp } from "../index.js";

const isDappSafe = computed(() => {
    return dapp.safe
})

function onDappSafe(func) {
    if (isDappSafe.value) {
        func()
    }
    else {
        const unwatch = watch(isDappSafe, () => {
            if (isDappSafe.value) {
                func()
                unwatch()
            }
        })
    }
}

const isProviderSafe = computed(() => {
    return isDappSafe.value && !dapp.status.network.is("DISCONNECTED");
})


function onProviderSafe(func) {
    onDappSafe(() => {
        if (isProviderSafe.value) {
            func()
        }
        else {
            const unwatch = watch(isProviderSafe, () => {
                if (isProviderSafe.value) {
                    func()
                    unwatch()
                }
            })
        }
    })
}

const isSignerSafe = computed(() => {
    return isProviderSafe.value && dapp.status.wallet.is("CONNECTED");
})

function onSignerSafe(func) {

    onProviderSafe(() => {
        if (isSignerSafe.value) {
            func()
        }
        else {
            const unwatch = watch(isSignerSafe, () => {
                if (isSignerSafe.value) {
                    func()
                    unwatch()
                }
            })
        }
    })
}

const areContractsSafe = computed(() => {
    return isProviderSafe.value && dapp.status.contracts.is("INITIALIZED");
})

function onContractsSafe(func) {

    onProviderSafe(() => {
        if (areContractsSafe.value) {
            func()
        }
        else {
            const unwatch = watch(areContractsSafe, () => {
                if (areContractsSafe.value) {
                    func()
                    unwatch()
                }
            })
        }
    })
}

export { isDappSafe, onDappSafe, isProviderSafe, onProviderSafe, isSignerSafe, onSignerSafe, areContractsSafe, onContractsSafe };
