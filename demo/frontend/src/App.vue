<script setup>
import { ConnectWalletButton,
         SelectNetworkDropdown,
         ContractInteractor,
         SelectWalletDropdown,
         dapp,
         DebugBar } from "../../../src/index.js";
import { computed, ref } from "vue";

let specialNumber = ref(null);

dapp.contracts.Lock.onReadSafe(function (cpt) {
    dapp.contracts.Lock.watch("specialNumber", [], (newValue, oldValue) => {
        specialNumber.value = newValue;
        console.log(`specialNumber has changed. Old = ${oldValue}; New = ${newValue};`)
    }, cpt)
})

</script>

<template>
    <DebugBar/>
    <h1>Tulipe Testing App</h1>
    <OnDappSafe>
        <p>{{ dapp.signer.address.value }}</p>
        <template #safe>
            <OnProviderSafe>
                <template #safe>
                    <ConnectWalletButton/>
                    <SelectWalletDropdown/>
                    <SelectNetworkDropdown/>

                    <p>Special number = {{ specialNumber ? specialNumber : "Loading..." }}</p>
                    <p>Available contracts :</p>
                    <ul>
                        <li v-for="(contract, contractName) of dapp.contracts.getAll()">
                          <OnContractReadSafe :contract="contractName">
                            {{ contractName }}
                            <ContractInteractor :contract="contractName"/>
                          </OnContractReadSafe>
                        </li>
                    </ul>

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
