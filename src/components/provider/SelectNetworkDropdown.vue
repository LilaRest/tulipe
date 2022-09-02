<script setup>
import { ethers } from "ethers";
import { dapp } from "../../index.js";
import { ref } from "vue";

let currentNetwork = ref({})
let availableNetworks = ref([])
let isDropdownOpened = ref(false);

dapp.onSafe(async function () {
  availableNetworks.value = dapp.config.networks.getAvailable()
})

dapp.provider.onSafe(async function () {
  currentNetwork.value = await dapp.config.networks.getCurrent()
  availableNetworks.value = dapp.config.networks.getAvailable().filter(n => n.id !== currentNetwork.value.id);
})

function toggle () {
  isDropdownOpened.value = isDropdownOpened.value ? false : true
}
</script>

<template>
  <OnDappSafe>
    <div class="SelectNetworkDropdown">
      <ul @click="toggle">
        <li v-if="currentNetwork">
          <img width="40" :src="currentNetwork.icon ? currentNetwork.icon : dapp.config.defaults.networks.icon" :alt="currentNetwork.displayName + ' logo'"/>
          <p>{{ currentNetwork.displayName }}</p>
        </li>
        <li v-else>
          <p>Select a network</p>
        </li>
        <li v-if="isDropdownOpened" v-for="network in availableNetworks" :key="network.id" @click="dapp.provider.changeNetwork(network.id)">
          <img width="40" :src="network.icon ? network.icon : dapp.config.defaults.networks.icon" :alt="network.displayName + ' logo'"/>
          <p>{{ network.displayName }}</p>
        </li>
      </ul>
    </div>
  </OnDappSafe>
</template>
