<script setup>
import { dapp, isNetworkSafe, connectWallet, disconnectWallet } from "../index.js";
</script>

<template v-if="isNetworkSafe">
  <div class="ConnectWalletButton">
      <button @click="connectWallet" v-if="dapp.status.wallet.is('DISCONNECTED')">Connect Wallet</button>
      <button v-else-if="dapp.status.wallet.is('REQUESTED')" disabled>Connection requested...</button>
      <button v-else-if="dapp.status.wallet.is('REFUSED')" disabled>Connection refused!</button>
      <button v-else-if="dapp.status.wallet.is('ERROR')" disabled>Connection error!</button>
      <button v-else-if="dapp.status.network.is('WRONG')" disabled>Wrong network! ({{ dapp.networks.current.displayName }})</button>
      <button @click="disconnectWallet" v-else-if="dapp.status.wallet.is('CONNECTED')">Disconnect</button>
  </div>
</template>

