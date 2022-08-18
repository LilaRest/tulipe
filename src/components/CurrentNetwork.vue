<script setup>
import { safeRun, dapp } from "../index.js";

let currentNetwork = $ref("");

safeRun(() => {

})
</script>


<template>
  <p class="CurrentNetwork">{{ currentNetwork }}</p>
</template>
