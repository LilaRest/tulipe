<script setup>
import { dapp } from "../../index.js";
const props = defineProps({
  contract: {
    type: String,
    required: true
  }
})

</script>
<template>
  <template v-if="dapp.contracts[props.contract].isWriteSafe.value">
    <slot></slot>
    <slot name="safe"></slot>
  </template>
  <template v-else>
    <slot name="unsafe"></slot>
  </template>
</template>
