<script setup>
import { dapp, EthersTransactionProxy, InputUnits } from "../../index.js";

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

const contract = dapp.contracts[props.contract];
let tx = $shallowRef({});
let methodInfos = $ref({});
const inputsValues = $ref([]);
const outputsValues = $ref([]);
const txArgs = $ref({
  value: 0,
})

function execFunc () {
  const args = [];
  inputsValues.forEach(i => {
    args.push(i)
  });

  tx.send(args, txArgs);
  tx.call
    .then((data) =>  {
      if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          outputsValues[i] = data[i];
        }
      }
      else {
        outputsValues[0] = data;
      }
    })
    .catch((error) => {
      error = error.reason;
    })
}

function formatPlaceholder(io) {
  return `${io.name && io.name !== "null" ? io.name : ""} (${io.type})`
}

dapp.contracts[props.contract].onReadSafe(async function () {
  methodInfos = contract.interface.functions[props.method];
  tx = new EthersTransactionProxy(props.contract, props.method);
  methodInfos.inputs.forEach(i => inputsValues.push(null))
  methodInfos.outputs.forEach(i => outputsValues.push(null))
});

</script>

<template>
  <OnContractReadSafe :contract="props.contract">
    <div class="MethodInteractor">
      <button @click="execFunc">{{ methodInfos.name }}</button>
      <small>{{ methodInfos.stateMutability }}</small>
      <div v-if="Object.keys(methodInfos.inputs).length > 0 || methodInfos.payable">
        <p>Inputs :</p>
        <ul>
          <li v-for="(input, index) of methodInfos.inputs">
            <input v-model="inputsValues[index]" type="text" :placeholder="formatPlaceholder(input)"/>
          </li>
          <li v-if="methodInfos.payable">
            <InputUnits v-model="txArgs.value"/>
          </li>
        </ul>
      </div>
      <div v-if="Object.keys(methodInfos.outputs).length > 0">
        <p>Outputs :</p>
        <ul>
          <li v-for="(output, index) of methodInfos.outputs">
            <input v-model="outputsValues[index]" type="text" :placeholder="formatPlaceholder(output)" disabled/>
          </li>
        </ul>
      </div>
      <p v-if="tx.status.is('ERROR')">{{ tx.error.value.reason }}</p>
    </div>
  </OnContractReadSafe>
</template>
