import { watch, computed } from "vue";
import { dapp } from "../index.js";

const isDAppSafe = computed(() => {
    return dapp.safe
})

function onDAppSafe(func) {
    if (isDAppSafe.value) {
        func()
    }
    else {
        const unwatch = watch(isDAppSafe, () => {
            if (isDAppSafe.value) {
                func()
                unwatch()
            }
        })
    }
}

const isNetworkSafe = computed(() => {
    return isDAppSafe.value && !dapp.status.network.is("DISCONNECTED");
})


function onNetworkSafe(func) {
    onDAppSafe(() => {
        if (isNetworkSafe.value) {
            func()
        }
        else {
            const unwatch = watch(isNetworkSafe, () => {
                if (isNetworkSafe.value) {
                    func()
                    unwatch()
                }
            })
        }
    })
}

const isWalletSafe = computed(() => {
    return isNetworkSafe.value && dapp.status.wallet.is("CONNECTED");
})

function onWalletSafe(func) {

    onNetworkSafe(() => {
        if (isWalletSafe.value) {
            func()
        }
        else {
            const unwatch = watch(isWalletSafe, () => {
                if (isWalletSafe.value) {
                    func()
                    unwatch()
                }
            })
        }
    })
}

const areContractsSafe = computed(() => {
    return isNetworkSafe.value && dapp.status.contracts.is("INITIALIZED");
})

function onContractsSafe(func) {

    onNetworkSafe(() => {
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

export { isDAppSafe, onDAppSafe, isNetworkSafe, onNetworkSafe, isWalletSafe, onWalletSafe, areContractsSafe, onContractsSafe };
