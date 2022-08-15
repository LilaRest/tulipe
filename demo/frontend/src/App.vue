<script setup>
import { ConnectWalletButton,
         SelectNetworkDropdown,
         ContractInteractor,
         dapp,
         safeRun } from "../../../src/index.js"

let contracts = $ref(null);
safeRun(() => {
    contracts = dapp.contracts.getAll()
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
