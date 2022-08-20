<script setup>
import { dapp, connectWallet, disconnectWallet } from "../index.js";
</script>

<template>
  <template v-if="dapp.provider.isSafe.value">
    <div class="ConnectWalletButton">
        <button @click="connectWallet" v-if="dapp.status.signer.is('DISCONNECTED')">Connect Wallet</button>
        <button v-else-if="dapp.status.signer.is('REQUESTED')" disabled>Connection requested...</button>
        <button v-else-if="dapp.status.signer.is('REFUSED')" disabled>Connection refused!</button>
        <button v-else-if="dapp.status.signer.is('ERROR')" disabled>Connection error!</button>
        <button v-else-if="dapp.status.provider.is('WRONG')" disabled>Wrong network! ({{ dapp.networks.current.displayName }})</button>
        <button @click="disconnectWallet" v-else-if="dapp.status.signer.is('CONNECTED')">Disconnect</button>
    </div>
  </template>
</template>
