<script setup>
import { dapp, styleLevelProp } from "../../index.js";
import { ref } from "vue";

const props = defineProps({
  styleLevel: styleLevelProp
})


</script>

<template>
  <dapp.provider.OnSafe>
    <div class="ConnectWalletButton" :class="`ve-${props.styleLevel}`">
        <!-- TODO : onclick Teleport in body the SelectWalletBox component -->
    </div>
  </dapp.provider.OnSafe>
</template>

<style scoped>
div.ConnectWalletButton.ve-minimal {
}
div.ConnectWalletButton.ve-opinionated {
}
</style>
