<script setup>
import { ConnectWalletButton,
         SelectNetworkDropdown,
         ContractInteractor,
         dapp,
         safeRun,
         watchChain,
         watchChainRef } from "../../../src/index.js"

let contracts = $ref(null);
let specialNumber = $ref(null);

safeRun(async function () { 
    contracts = dapp.contracts.getAll()

    specialNumber = dapp.contracts.Lock.watchRef("specialNumber", []);
    console.log("SPÉÉ")
    console.log(specialNumber)

    dapp.contracts.Lock.watch("specialNumber", [], (newValue, oldValue) => {
        console.log("specialNumber has changed")
        console.log("new = " + newValue)
        console.log("old = " + oldValue)
    })
    // TODO : implement a watch() method directly in the contracts objects in order to make the call easier.
})
</script>

<template>
    <h1>Vuethers Testing App</h1>
    <template v-if="dapp.safe">
        <p>Current network : {{ dapp.networks.current ? dapp.networks.current.displayName : "Unsupported network"}}</p>
        <ConnectWalletButton/>
        <SelectNetworkDropdown/>
        <p>Special number = {{ dapp.contracts.Lock.watchRef("specialNumber", []) }}</p>
        <p>Special number = {{ specialNumber.value ? specialNumber.value.toNumber() : "Loading..." }}</p>
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
