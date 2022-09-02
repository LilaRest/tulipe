<script setup>
import { dapp } from "../../index.js";
import { ref } from "vue";

let currentWallet = ref({})
let availableWallets = ref([])
let isDropdownOpened = ref(false);

dapp.onSafe(async function () {
  availableWallets.value = dapp.config.wallets.getAvailable()
})

dapp.signer.onSafe(async function () {
  currentWallet.value = await dapp.config.wallets.getCurrent()
  availableWallets.value = dapp.config.wallets.getAvailable().filter(w => w.id !== currentWallet.value.id);
})

function toggle () {
  isDropdownOpened.value = isDropdownOpened.value ? false : true
}
</script>

<template>
  <OnDappSafe>
    <div class="SelectWalletDropdown">
      <ul @click="toggle">
        <li v-if="currentWallet">
          <img width="40" :src="currentWallet.icon ? currentWallet.icon : dapp.config.defaults.wallets.icon" :alt="currentWallet.displayName + ' logo'"/>
          <p>{{ currentWallet.displayName }}</p>
        </li>
        <li v-else>
          <p>Select a wallet</p>
        </li>
        <li v-if="isDropdownOpened" v-for="wallet in availableWallets" :key="wallet.id" @click="dapp.signer.connectWallet(dapp.wallets[wallet.id])">
          <img width="40" :src="wallet.icon ? wallet.icon : dapp.config.defaults.wallets.icon" :alt="wallet.displayName + ' logo'"/>
          <p>{{ wallet.displayName }}</p>
        </li>
      </ul>
    </div>
  </OnDappSafe>
</template>
