<script setup>
import { dapp } from "../index.js";

let currentNetwork = $ref("");

dapp.provider.onSafe(() => {

})
</script>

<template>
  <template v-if="dapp.provider.isSafe.value">
    <p class="CurrentNetwork">{{ currentNetwork }}</p>
  </template>
</template>
