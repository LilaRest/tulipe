<script setup>
import { dapp, connectWallet, disconnectWallet } from "../index.js";
</script>

<template>
  <OnProviderSafe>
    <div class="ConnectWalletButton">
        <button @click="connectWallet" v-if="dapp.signer.status.is('DISCONNECTED')">Connect Wallet</button>
        <button v-else-if="dapp.signer.status.is('REQUESTED')" disabled>Connection requested...</button>
        <button v-else-if="dapp.signer.status.is('REFUSED')" disabled>Connection refused!</button>
        <button v-else-if="dapp.signer.status.is('ERROR')" disabled>Connection error!</button>
        <button v-else-if="dapp.provider.status.is('WRONG')" disabled>Wrong network! ({{ dapp.networks.current.displayName }})</button>
        <button @click="disconnectWallet" v-else-if="dapp.signer.status.is('CONNECTED')">Disconnect</button>
    </div>
  </OnProviderSafe>
</template>
