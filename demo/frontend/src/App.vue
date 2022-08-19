<script setup>
import { ConnectWalletButton,
         SelectNetworkDropdown,
         ContractInteractor,
         dapp,
         isDappSafe,
         isSignerSafe,
         isProviderSafe,
         onContractsSafe,
         areContractsSafe, 
         DebugBar } from "../../../src/index.js";
import OtherComponent from "./components/OtherComponent.vue";

let otherComponentDisplay = $ref(false);

function toggleOtherComponentDisplay() {
  otherComponentDisplay = !otherComponentDisplay;
}

let contracts = $ref(null);
let specialNumber = $ref(null);

onContractsSafe(async function () { 
    contracts = dapp.contracts.getAll()

    specialNumber = dapp.contracts.Lock.watchRef("specialNumber", []);

    dapp.contracts.Lock.watch("specialNumber", [], (newValue, oldValue) => {
        console.log("specialNumber has changed")
        console.log("new = " + newValue)
        console.log("old = " + oldValue)
    })
})
</script>

<template>
    <DebugBar/>
    <h1>Vuethers Testing App</h1>
    <template v-if="isDappSafe">
        <template v-if="isProviderSafe">
            <ConnectWalletButton/>
            <SelectNetworkDropdown/>
            <button @click="toggleOtherComponentDisplay">Toggle OtherComponent</button>
            <OtherComponent v-if="otherComponentDisplay"/>

            <template v-if="areContractsSafe">
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
                Contracts are loading or not found.
            </template>
        </template>
        <template v-else>
            No network provided, please download Metamask or any supported web wallet.
        </template>
    </template>
    <template v-else>
        <p>Loading...</p>
    </template>
</template>
