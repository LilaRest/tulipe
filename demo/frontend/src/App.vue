<script setup>
import { ConnectWalletButton,
         SelectNetworkDropdown,
         ContractInteractor,
         dapp,
         DebugBar } from "../../../src/index.js";
import OtherComponent from "./components/OtherComponent.vue";
import { computed } from "vue";

dapp.contracts.onSafe(function (cpt) {
    dapp.contracts.Lock.watch("specialNumber", [], (newValue, oldValue) => {
        console.log("specialNumber has changed")
        console.log("new = " + newValue)
        console.log("old = " + oldValue)
    }, cpt)

    contracts = dapp.contracts.getAll()

    const specialNumberWatcher = dapp.contracts.Lock.watchRef("specialNumber", [], cpt)
    specialNumber = computed(() => specialNumberWatcher.value ? specialNumberWatcher.value.toNumber() : null);
})

const test = {OtherComponent: OtherComponent};

let otherComponentDisplay = $ref(true);

function toggleOtherComponentDisplay() {
  otherComponentDisplay = !otherComponentDisplay;
}

let contracts = $ref(null);
let specialNumber = $ref(null);
</script>

<template>
    <DebugBar/>
    <h1>Vuethers Testing App</h1>

    <OnDappSafe>
        <template #safe>
            <OnProviderSafe>
                <template #safe>
                    <ConnectWalletButton/>
                    <SelectNetworkDropdown/>
                    <button @click="toggleOtherComponentDisplay">Toggle OtherComponent</button>
                    <test.OtherComponent v-if="otherComponentDisplay"/>

                    <OnContractsSafe>
                        <template #safe>
                            <p>Special number = {{ specialNumber.value ? specialNumber.value : "Loading..." }}</p>
                            <p>Available contracts :</p>
                            <ul>
                                <li v-for="(contract, contractName) of contracts">
                                    {{ contractName }}
                                    <ContractInteractor :contractName="contractName"/>
                                </li>
                            </ul>
                        </template>

                        <template #unsafe>
                            Contracts are loading or not found.
                        </template>
                    </OnContractsSafe>
                </template>

                <template #unsafe>
                    No network provided, please download Metamask or any supported web wallet.
                </template>
            </OnProviderSafe>
        </template>

        <template #unsafe>
            <p>Loading...</p>
        </template>
    </OnDappSafe>
</template>
