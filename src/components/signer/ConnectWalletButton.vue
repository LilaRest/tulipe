<script setup>
import { dapp } from "../../index.js";
</script>

<template>
  <OnProviderSafe>
    <div class="ConnectWalletButton">
        <button @click="dapp.signer.connectWallet(dapp.wallets.metamask)" v-if="dapp.signer.status.is('DISCONNECTED')">Connect Wallet</button>
        <button v-else-if="dapp.signer.status.is('REQUESTED')" disabled>Connection requested...</button>
        <button v-else-if="dapp.signer.status.is('REFUSED')" disabled>Connection refused!</button>
        <button v-else-if="dapp.signer.status.is('ERROR')" disabled>Connection error!</button>
        <button v-else-if="dapp.provider.status.is('WRONG')" disabled>Wrong network! ({{ dapp.networks.current.displayName }})</button>
        <button @click="dapp.signer.disconnectWallet" v-else-if="dapp.signer.status.is('CONNECTED')">Disconnect</button>
    </div>
  </OnProviderSafe>
</template>
