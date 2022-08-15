<script setup>
import { dapp } from "../index.js";
import { ethers } from "ethers";

const props = defineProps({
  contractName: {
    type: String,
    required: true
  }
})

const contract = dapp.contracts[props.contractName]
console.log(contract.interface)
const owner = await contract.owner()
const units = ["wei", "gwei", "ether"]

async function transact (func, funcArgs, txArgs={}) {
  let data, error, call = null;
  if (funcArgs) {
    if (Array.isArray(funcArgs)) {
      call = func(...funcArgs, txArgs)
    }
    else {
      call = func(funcArgs, txArgs)
    }
  }
  else {
    call = func(txArgs)
  }
  await call
    .then((res) => (data = res))
    .catch((err) => (error = err))
  return { data, error }
}

async function execFunc (funcName) {

  const funcArgs = []
  for (const input of functions[funcName].inputs) {
    funcArgs.push(input.value);
  }
  const txArgs = {}
  if (functions[funcName].payable && functions[funcName].tx.value != "") {
    txArgs.value = ethers.utils.parseUnits(functions[funcName].tx.value.value, functions[funcName].tx.value.unit);
  }

  const { data, error } = await transact(contract.functions[funcName], funcArgs, txArgs)

  if (error) {
    functions[funcName].error = error.reason;
  }
  else {
    for (let i = 0; i < data.length; i++) {
      functions[funcName].outputs[i].value = data[i];
    }
  }
}

const functions = $ref({})
for (const func of Object.values(contract.interface.functions)) {
  functions[func.name] = {
    inputs: [],
    outputs: [],
    error: null,
    payable: func.payable,
    mutability: func.stateMutability === "view" || func.stateMutability === "pure" ? "read" : "write",
    tx: {
      value: {
        value: "",
        unit: "wei",
      },
    }
  }
  console.log(func)

  for (let i = 0; i < func.inputs.length; i++) {
    functions[func.name].inputs[i] = {
      name: func.inputs[i].name,
      type: func.inputs[i].type,
      value: "",
    };
  }

  for (let i = 0; i < func.outputs.length; i++) {
    functions[func.name].outputs[i] = {
      name: func.outputs[i].name,
      type: func.outputs[i].type,
      value: "",
    };
  }
}

async function receiveEvent(event) {
  events[event.event].count += 1

  // Build log :
  let log = `Block ${event.blockNumber} -> {`
  for(const input of events[event.event].inputs) {
    log += `${input.name}:${event.args[input.name]}, ` 
  }
  log = log.substring(0, log.length - 2) + "}"
  events[event.event].logs.push(log)
}

const events = $ref({})
for (const event of Object.values(contract.interface.events)) {
  events[event.name] = {
    count: 0,
    logs: [],
    inputs: event.inputs,
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

function formatPlaceholder(io) {
  return `${io.name && io.name !== "null" ? io.name : "unnamed"} (${io.type})`
}

function formatFunctionKeywords(func) {
  const keywords = []
  keywords.push(func.mutability)
  func.payable ? keywords.push("payable") : null
  return keywords.join(", ")
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
          <button @click="execFunc(funcName)">{{ funcName }}</button>
          <small>({{ formatFunctionKeywords(func) }})</small>
          <br/>
          <div v-if="Object.keys(func.inputs).length > 0 || func.payable">
            <small>Inputs :</small>
            <ul>
              <li v-for="(input, index) of func.inputs">
                <input v-model="input.value" :type="getType(input.type)" :placeholder="formatPlaceholder(input)"/>
              </li>
              <li v-if="func.payable">
                <input  v-model="func.tx.value.value" type="text" placeholder="TX value"/>
                <select v-model="func.tx.value.unit">
                  <option v-for="unit in units" :value="unit">{{ unit }}</option>
                </select>
              </li>
            </ul>
          </div>
          <div v-if="Object.keys(func.outputs).length > 0">
            <small>Outputs :</small>
            <ul>
              <li v-for="(output, index) of func.outputs">
                <input v-model="output.value" type="text" :placeholder="formatPlaceholder(output)" disabled/>
              </li>
            </ul>
          </div>
          <p v-if="func.error">{{ func.error }}</p>
        </li>
      </ul>
    </li>
    <li>
      Events :
      <ul>
        <li v-for="(event, eventName) in events">
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
