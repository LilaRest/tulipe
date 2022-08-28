<script setup>
import { ConnectWalletButton,
         SelectNetworkDropdown,
         ContractInteractor,
         AvailableWallets,
         dapp,
         DebugBar } from "../../../src/index.js";
import { computed } from "vue";

let contracts = $ref(null);
let specialNumber = $ref(null);

dapp.contracts.Lock.onReadSafe(function (cpt) {
    contracts = dapp.contracts.getAll()
    dapp.contracts.Lock.watch("specialNumber", [], (newValue, oldValue) => {
        specialNumber = newValue;
        console.log("specialNumber has changed")
        console.log("new = " + newValue)
        console.log("old = " + oldValue)
    }, cpt)

})

</script>

<template>
    <DebugBar/>
    <h1>Vuethers Testing App</h1>
    <OnDappSafe>
        <p>{{ dapp.signer.address.value }}</p>
        <template #safe>
            <OnProviderSafe>
                <template #safe>
                    <ConnectWalletButton/>
                    <AvailableWallets/>
                    <SelectNetworkDropdown/>
                    <button @click="toggleOtherComponentDisplay">Toggle OtherComponent</button>

                    <OnContractsReadSafe>
                        <template #safe>
                            <p>Special number = {{ specialNumber ? specialNumber : "Loading..." }}</p>
                            <p>Available contracts :</p>
                            <ul>
                                <li v-for="(contract, contractName) of contracts">
                                    {{ contractName }}
                                    <ContractInteractor :contract="contractName"/>
                                </li>
                            </ul>
                        </template>

                        <template #unsafe>
                            Contracts are loading or not found.
                        </template>
                    </OnContractsReadSafe>
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
