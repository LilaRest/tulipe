<script setup>
import { dapp, EthersTransactionProxy } from "../../index.js";
const props = defineProps({
  content: {
    type: String,
    required: false,
  },
  contract: {
    type: String,
    required: true,
  },
  action: {
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
  }
})

let tx = new EthersTransactionProxy(null);

dapp.contracts.onReadSafe(() => {
  try {
    tx.func = dapp.contracts[props.contract][props.action]
  }
  catch (e) {
    console.log(e);
    throw `Error in Transact component : contract '${props.contract}' doesn't exist or it doesn't have any property '${props.action}'`
  }
})

function emitTransaction () {
  const args = props.args ? props.args : []
  const txArgs = props.txArgs ? props.txArgs : {}
  tx.send(args, txArgs);
}
</script>

<template>
  <button @click="emitTransaction" v-if="tx.status.is('UNSENT')">{{ props.content ? props.content : "Transact" }}</button>
  <button v-else-if="tx.status.is('SENT')" disabled>Transaction sent...</button>
  <button v-else-if="tx.status.is('ERROR')" disabled>Transaction error!</button>
  <button v-else-if="tx.status.is('SUCCESS')" disabled>Success !</button>
  <p v-if="tx.status.is('ERROR')">{{ tx.error.reason }}</p>
</template>
