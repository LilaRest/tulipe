<script setup>
import { dapp } from "../index.js";
import { ref } from "vue";

let currentNetwork = ref("");

dapp.provider.onSafe(() => {

})
</script>

<template>
  <OnProviderSafe>
    <p class="CurrentNetwork">{{ currentNetwork }}</p>
  </OnProviderSafe>
</template>
