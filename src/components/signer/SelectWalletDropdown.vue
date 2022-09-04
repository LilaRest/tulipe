<script setup>
import { dapp } from "../../index.js";
import { ref } from "vue";

let currentWallet = ref(null)
let availableWallets = ref([])
let isDropdownOpened = ref(false);

let currentNetwork = ref({});

dapp.onSafe(async function () {
  availableWallets.value = dapp.config.wallets.getAvailable()
})

dapp.provider.onSafe(async function () {
  currentNetwork.value = await dapp.config.networks.getCurrent();
})

dapp.signer.onSafe(async function () {
  currentWallet.value = await dapp.config.wallets.getCurrent();
  console.log(currentWallet.value)
  try {
    availableWallets.value = dapp.config.wallets.getAvailable().filter(w => w.id !== currentWallet.value.id);
  }
  catch (e) {
    availableWallets.value = dapp.config.wallets.getAvailable();
  }
})

function toggle () {
  isDropdownOpened.value = isDropdownOpened.value ? false : true
}
</script>

<template>
  <OnDappSafe>
    <div class="SelectWalletDropdown">
      <ul>
        <li v-if="dapp.signer.status.is('REQUESTED')">
          <p>Connection requested...</p>
        </li>
        <li v-else-if="dapp.signer.status.is('REFUSED')">
          <p>Connection refused!</p>
        </li>
        <li v-else-if="dapp.provider.status.is('WRONG_NETWORK')">
          <p>Wrong network! ({{ currentNetwork ? currentNetwork.displayName : "unknown" }})</p>
        </li>
        <li v-else-if="dapp.signer.status.is('DISCONNECTED') || !currentWallet" @click="toggle">
          <p>Select a wallet</p>
        </li>
        <li v-else-if="dapp.signer.status.is('CONNECTED')" @click="toggle">
          <img width="40" :src="currentWallet.icon ? currentWallet.icon : dapp.config.defaults.wallets.icon" :alt="currentWallet.displayName + ' logo'"/>
          <p>{{ currentWallet.displayName }}</p>
        </li>
        <li v-if="isDropdownOpened" v-for="wallet in availableWallets" :key="wallet.id" @click="dapp.signer.connectWallet(wallet.id)">
          <img width="40" :src="wallet.icon ? wallet.icon : dapp.config.defaults.wallets.icon" :alt="wallet.displayName + ' logo'"/>
          <p>{{ wallet.displayName }}</p>
        </li>
      </ul>
    </div>
  </OnDappSafe>
</template>
