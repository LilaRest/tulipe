<script setup>
import { markRaw } from "vue";
import { dapp } from "../index.js";

const props = defineProps({
  contractName: {
    type: String,
    required: true
  }
})

const contract = dapp.contracts[props.contractName]
const owner = await contract.owner()

async function execFunc (funcName) {
  try {
    const response = await contract[funcName](...functionsIO[funcName].inputs);
    functionsIO[funcName].outputs[0] = response;
  }
  catch (e) {
    functionsIO[funcName].error = e.reason;
  }
}

const functionsIO = $ref({})
for (const func of Object.values(contract.interface.functions)) {
  functionsIO[func.name] = {
    inputs: [],
    outputs: [],
    error: null,
    properties: {
      constant: func.constant,
      payable: func.payable,
      inputs: func.inputs,
      outputs: func.outputs,
    }
  }
  for (const inputIndex in func.inputs) {
    functionsIO[func.name].inputs[inputIndex] = "";
  }
  for (const outputIndex in func.outputs) {
    functionsIO[func.name].outputs[outputIndex] = "";
  }
}

async function receiveEvent(event) {
  eventsIO[event.event].count += 1

  // Build log :
  let log = `Block ${event.blockNumber} -> {`
  for(const input of eventsIO[event.event].properties.inputs) {
    log += `${input.name}:${event.args[input.name]}, ` 
  }
  log = log.substring(0, log.length - 2) + "}"
  eventsIO[event.event].logs.push(log)
}

const eventsIO = $ref({})
for (const event of Object.values(contract.interface.events)) {
  eventsIO[event.name] = {
    count: 0,
    logs: [],
    properties: {
      inputs: event.inputs,
    }
  }
  contract.on(event, receiveEvent)
}

function getType(type) {
  if (type.includes("int")) {
    return "number"
  }
  else {
    return "text"
  }
}
</script>

<template>
  <p>Interact with '{{ contractName }}' contract :</p>
  <ul>
    <li>Address : {{ contract.address }}</li>
    <li>Owner : {{ owner }}</li>
    <li>Functions :
      <ul>
        <li v-for="(func, funcName) in functionsIO">
          <button @click="execFunc(funcName)">{{ funcName }} ({{ func.properties.constant ? "read-only" : "" }}{{ func.properties.payable ? ", payable" : "" }})</button>
          <input v-for="(input, index) in func.properties.inputs" v-model="func.inputs[index]" :type="getType(input.type)" :placeholder="input.type"/>
          <input v-for="(output, index) in func.properties.outputs" v-model="func.outputs[index]" type="text" :placeholder="output.type" disabled/>
          <p v-if="func.error">{{ func.error }}</p>
        </li>
      </ul>
    </li>
    <li>
      Events :
      <ul>
        <li v-for="(event, eventName) in eventsIO">
          <h3>{{ eventName }}</h3>
          <p>Count : {{ event.count }}</p>
          <p>Logs:</p>
          <ul>
            <li v-for="log in event.logs">{{ log }}</li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>
