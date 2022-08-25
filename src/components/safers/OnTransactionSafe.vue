<script setup>
import { EthersTransactionProxy } from "../../index.js";
const props = defineProps({
  transaction: {
    type: EthersTransactionProxy,
    required: true
  }
})

</script>
<template>
  <template v-if="props.transaction.isSafe.value">
    <slot></slot>
    <slot name="safe"></slot>
  </template>
  <template v-else>
    <slot name="unsafe"></slot>
  </template>
</template>
