<script setup>
import { InputUnits, Transact, TulipeTransaction } from "../../index.js";
import { shallowRef } from "vue";

const props = defineProps({
  contract: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  }
})

const tx = shallowRef(new TulipeTransaction(props.contract, props.method));

function formatPlaceholder(io) {
  return `${io.name && io.name !== "null" ? io.name : ""} (${io.type})`
}
</script>

<template>
  <OnContractReadSafe :contract="props.contract">
    <div class="MethodInteractor">
      <Transact :contract="props.contract" :method="props.method" v-model="tx" :configs="{content: props.method, notx: true, noerror: true}"/>
      <small>{{ tx.methodInfos.stateMutability }}</small>
      <div v-if="Object.keys(tx.methodInfos.inputs).length > 0 || tx.methodInfos.payable">
        <p>Inputs :</p>
        <ul>
          <li v-for="(input, index) of tx.methodInfos.inputs">
            <input v-model="tx.args.value[index]" type="text" :placeholder="formatPlaceholder(input)"/>
            {{ tx.args.value[index] }}
            {{ typeof tx.args.value[index] }}
          </li>
          <li v-if="tx.methodInfos.payable">
            <InputUnits v-model="tx.txArgs.value.value"/>
            {{ tx.txArgs.value.value }}
            {{ typeof tx.txArgs.value.value }}
          </li>
        </ul>
      </div>
      <div v-if="Object.keys(tx.methodInfos.outputs).length > 0">
        <p>Outputs :</p>
        <ul>
          <li v-for="(output, index) of tx.methodInfos.outputs">
            <input v-if="tx.data.value" v-model="tx.data.value[index]" type="text" :placeholder="formatPlaceholder(output)" disabled/>
            <input v-else type="text" :placeholder="formatPlaceholder(output)" disabled/>
          </li>
        </ul>
      </div>
      <p v-if="tx.status.is('ERROR')">{{ tx.error.value.reason }}</p>
    </div>
  </OnContractReadSafe>
</template>
