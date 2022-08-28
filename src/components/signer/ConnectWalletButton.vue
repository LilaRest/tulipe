<script setup>
import { dapp, styleLevelProp } from "../../index.js";
import { ref } from "vue";

const props = defineProps({
  styleLevel: styleLevelProp
})

let currentNetwork = ref({});
dapp.provider.onSafe(async function () {
  currentNetwork.value = await dapp.config.networks.getCurrent();
})
</script>

<template>
  <dapp.provider.OnSafe>
    <div class="ConnectWalletButton" :class="`ve-${props.styleLevel}`">
        <button @click="dapp.signer.connectWallet(dapp.wallets.metamask)" v-if="dapp.signer.status.is('DISCONNECTED')">Connect Wallet</button>
        <button v-else-if="dapp.signer.status.is('REQUESTED')" disabled>Connection requested...</button>
        <button v-else-if="dapp.signer.status.is('REFUSED')" disabled>Connection refused!</button>
        <button v-else-if="dapp.signer.status.is('ERROR')" disabled>Connection error!</button>
        <button v-else-if="dapp.provider.status.is('WRONG')" disabled>Wrong network! ({{ currentNetwork ? currentNetwork.value.displayName : "unknown" }})</button>
        <button @click="dapp.signer.disconnectWallet" v-else-if="dapp.signer.status.is('CONNECTED')">Disconnect</button>
    </div>
  </dapp.provider.OnSafe>
</template>

<style scoped>
div.ConnectWalletButton.ve-minimal {
}
div.ConnectWalletButton.ve-opinionated {
}
</style>
