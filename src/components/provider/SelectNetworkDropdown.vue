<script setup>
import { ethers } from "ethers";
import { dapp } from "../../index.js";
import { ref } from "vue";

let currentNetwork = ref({})
let availableNetworks = ref([])

dapp.onSafe(async function () {
  currentNetwork.value = await dapp.config.networks.getCurrent()
  availableNetworks.value = dapp.config.networks.getAvailable()
  availableNetworks.value = availableNetworks.value.filter(n => n != currentNetwork.value);
})

async function changeNetwork (id) {
  const providerConfig = availableNetworks.value.find(o => o.chainId === parseInt(id))

  if (providerConfig) {
    id = ethers.utils.hexlify(parseInt(id)).toString()
    id = ethers.utils.hexValue(id)

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{
          chainId: id,
        }]
      });
    }
    catch (e) {

      // If the user don't have the network, add it.
      if (e.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
              chainId: id,
              rpcUrls: [providerConfig.defaultRPC],
              chainName: providerConfig.name,
              nativeCurrency: {
                  name: providerConfig.currency.symbol,
                  symbol: providerConfig.currency.symbol,
                  decimals: providerConfig.currency.decimals
              },
              blockExplorerUrls: providerConfig.explorer && providerConfig.explorer.url !== "" ? [providerConfig.explorer.url] : null,
          }]
        });
      }
    }
  }
}

function toggle () {
  isDropdownOpened.value = isDropdownOpened.value ? false : true
}

let isDropdownOpened = ref(false);

</script>

<template>
  <OnDappSafe>
    <div class="SelectNetworkDropdown">
      <ul @click="toggle">
        <li v-if="currentNetwork" selected>
          <img width="40" :src="currentNetwork.icon ? currentNetwork.icon : dapp.config.defaults.networks.icon" :alt="currentNetwork.name + ' logo'"/>
          <p>{{ currentNetwork.displayName }}</p>
        </li>
        <li v-if="isDropdownOpened" v-for="network in availableNetworks" :key="network.chainId" @click="changeNetwork(network.chainId)">
          <img width="40" :src="network.icon ? network.icon : dapp.config.defaults.networks.icon" :alt="network.name + ' logo'"/>
          <p>{{ network.displayName }}</p>
        </li>
      </ul>
    </div>
  </OnDappSafe>
</template>
