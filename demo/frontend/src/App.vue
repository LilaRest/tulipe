<script setup>
import { ConnectWalletButton,
         SelectNetworkDropdown,
         ContractInteractor,
         dapp,
         safeRun,
         watchChain } from "../../../src/index.js"

let contracts = $ref(null);
safeRun(() => { 
    contracts = dapp.contracts.getAll()

    watchChain(dapp.contracts.Lock, "specialNumber", [], (newValue, oldValue) => {
        console.log("specialNumber has changed")
        console.log(newValue)
        console.log(oldValue)
    })
    // TODO : implement this directly in the contracts object in order to make the call easier.
})
</script>

<template>
    <h1>Vuethers Testing App</h1>
    <template v-if="dapp.initialized">
        <p>Current network : {{ dapp.networks.current ? dapp.networks.current.displayName : "Unsupported network"}}</p>
        <ConnectWalletButton/>
        <SelectNetworkDropdown/>
        <p>Available contracts :</p>
        <ul>
            <li v-for="(contract, contractName) of contracts">
                {{ contractName }}
                <ContractInteractor :contractName="contractName"/>
            </li>
        </ul>
    </template>
    <template v-else>
        <p>Loading...</p>
    </template>
</template>
