<script setup>
import { ethers } from "ethers";

let props = defineProps({
  modelValue: {},
  placeholder: {
    type: String,
  }
})
const emit = defineEmits(['update:modelValue'])

let value = $ref(null);
const units = ["wei", "gwei", "ether"]
let selectedUnit = $ref("wei");

function updateValue() {
  if (value) {
    const newValue = ethers.utils.parseUnits(value, selectedUnit)
    emit('update:modelValue', newValue)
  }
}
</script>

<template>
  <div class="InputUnits">
    <input @input="updateValue" v-model="value" type="text" :placeholder="props.placeholder"/>
    <select @change="updateValue" v-model="selectedUnit">
      <option v-for="unit in units" :value="unit">{{ unit }}</option>
    </select>
  </div>
</template>
