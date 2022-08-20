<script setup>
import { dapp } from "../index.js";

let currentNetwork = $ref("");

dapp.provider.onSafe(() => {

})
</script>

<template>
  <OnProviderSafe>
    <p class="CurrentNetwork">{{ currentNetwork }}</p>
  </OnProviderSafe>
</template>
