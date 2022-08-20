<script setup>
import { dapp } from "../../index.js";
</script>
<template>
  <template v-if="dapp.isSafe.value">
    <slot></slot>
    <slot name="safe"></slot>
  </template>
  <template v-else>
    <slot name="unsafe"></slot>
  </template>
</template>
