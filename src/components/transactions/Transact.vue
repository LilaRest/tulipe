<script setup>
import { dapp, TulipeTransaction } from "../../index.js";
import { computed } from "vue";

const props = defineProps({
  modelValue: {},
  contract: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  args: {
    type: Array,
    required: false,
  },
  txArgs: {
    type: Object,
    required: false,
  },
  configs: {
    type: Object,
    required: false,
  }
})
const emit = defineEmits(['update:modelValue'])

const contract = dapp.contracts[props.contract];
let tx = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

function emitTransaction () {
  const args = props.args ? props.args : []
  const txArgs = props.txArgs ? props.txArgs : {}
  tx.value.send(args, txArgs);
}

if (props.config && props.configs.notx) {
  contract.onReadSafe(() => {
      tx = new TulipeTransaction(props.contract, props.method);
  })
}
</script>

<template>
  <OnContractReadSafe :contract="props.contract">
    <div class="TransactButton">
      <button @click="emitTransaction" v-if="tx.status.is('READY')">{{ props.configs && props.configs.content ? props.configs.content : "Transact" }}</button>
      <button v-else-if="tx.status.is('SENT')" disabled>Transaction sent...</button>
      <button v-else-if="tx.status.is('ERROR')" disabled>Transaction error!</button>
      <button v-else-if="tx.status.is('SUCCESS')" disabled>Success !</button>
      <p v-if="!(props.configs && props.configs.noerror) && tx.status.is('ERROR')">{{ tx.error.value.reason }}</p>
    </div>
  </OnContractReadSafe>
</template>
