<script setup>
import { useDappStore } from "../index.js";
import { markRaw } from "vue";
const dapp = useDappStore()
const props = defineProps({
  contractName: {
    type: String,
    required: true
  }
})
const contract = dapp.contracts[props.contractName]

const owner = await contract.owner()
const functions = contract.interface.functions;
const functionsIO = $ref({})
for (const funcName of Object.keys(functions)) {
  functionsIO[funcName] = {
    inputs: [],
    outputs: [],
    error: null,
  }
  for (const inputIndex in functions[funcName].inputs) {
    functionsIO[funcName].inputs[inputIndex] = "";
  }
  for (const outputIndex in functions[funcName].outputs) {
    functionsIO[funcName].outputs[outputIndex] = "";
  }
}


const events = contract.interface.events;
const eventsIO = $ref({})

async function receiveEvent(event) {
  eventsIO[event.event].count += 1

  // Build log :
  let log = `Block ${event.blockNumber} -> {`
  for(const input of events[event.eventSignature].inputs) {
    log += `${input.name}:${event.args[input.name]}, ` 
  }
  log = log.substring(0, log.length - 2) + "}"
  eventsIO[event.event].logs.push(log)
}

for (const event of Object.values(events)) {
  eventsIO[event.name] = {
    count: 0,
    logs: []
  }
  contract.on(event, receiveEvent)
}

async function execFunc (funcName) {
  try {
    const response = await contract[funcName](...functionsIO[funcName].inputs);

    functionsIO[funcName].outputs[0] = response;
  }
  catch (e) {
    functionsIO[funcName].error = e.reason;
  }
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
        <li v-for="(func, funcName) in functions">
          <button @click="execFunc(funcName)">{{ func.name }} ({{ func.constant ? "read-only" : "" }}{{ func.payable ? ", payable" : "" }})</button>
          <input v-for="(input, index) in func.inputs" v-model="functionsIO[funcName].inputs[index]" :type="getType(input.type)" :placeholder="input.type"/>
          <input v-for="(output, index) in func.outputs" v-model="functionsIO[funcName].outputs[index]" type="text" :placeholder="output.type" disabled/>
          <p v-if="functionsIO[funcName].error" style="color: red;">{{ functionsIO[funcName].error }}</p>
        </li>
      </ul>
    </li>
    <li>
      Events :
      <ul>
        <li v-for="(event, eventName) in eventsIO">
          <h3>{{ eventName }}</h3>
          <p>Count : {{ eventsIO[eventName].count }}</p>
          <p>Logs:</p>
          <ul>
            <li v-for="log in eventsIO[eventName].logs">{{ log }}</li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>
