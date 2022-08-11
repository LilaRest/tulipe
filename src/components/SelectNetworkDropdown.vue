<script setup>
import { useDappStore } from "../stores/dapp.js";
import { ethers } from "ethers";
const dapp = useDappStore()

async function changeNetwork (id) {
  const network = dapp.networks.available.find(o => o.chainId === parseInt(id))

  if (network) {
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
        console.log("ADD CHAIN")
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
              chainId: id,
              rpcUrls: [network.defaultRPC],
              chainName: network.name,
              nativeCurrency: {
                  name: network.currency.symbol,
                  symbol: network.currency.symbol,
                  decimals: network.currency.decimals
              },
              blockExplorerUrls: network.explorer && network.explorer.url !== "" ? [network.explorer.url] : null,
          }]
        });
      }
    }
  
    // Reload the app if the network has changed.
    const newNetwork = await dapp.provider.getNetwork()
    if (dapp.networks.current.chainId !== newNetwork.chainId) {
      window.location.reload();
    }
  }

}
let isDropdownOpened = $ref(false);

function toggle () {
  isDropdownOpened = isDropdownOpened ? false : true
}

</script>

<template>
  <div class="SelectNetworkDropdown">
    <ul @click="toggle">
      <li v-if="dapp.networks.current" selected>
        <img width="40" :src="dapp.networks.current.icon ? dapp.networks.current.icon : dapp.defaults.networks.icon" :alt="dapp.networks.current.name + ' logo'"/>
        <p>{{ dapp.networks.current.displayName }}</p>
      </li>
      <li v-if="isDropdownOpened" v-for="network in dapp.networks.available" :key="network.chainId" @click="changeNetwork(network.chainId)">
        <img width="40" :src="network.icon ? network.icon : dapp.defaults.networks.icon" :alt="network.name + ' logo'"/>
        <p>{{ network.displayName }}</p>
      </li>
    </ul>
  </div>
</template>

<style>
</style>
