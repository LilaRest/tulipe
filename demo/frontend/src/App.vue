<script setup>
import { ConnectWalletButton,
         SelectNetworkDropdown,
         ContractInteractor } from "../../../src/index.js"
</script>

<template>
    <h1>Vuethers Testing App</h1>
    <p>Current network : {{ dapp.networks.current ? dapp.networks.current.displayName : "Unsupported network"}}</p>
    <ConnectWalletButton/>
    <SelectNetworkDropdown/>
    <p>Available contracts :</p>
    <ul>
        <li v-for="(contract, contract_name) in dapp.contracts">
            {{ contract_name }}
            <ContractInteractor :contractName="contract_name"/>
        </li>
    </ul>
</template>
