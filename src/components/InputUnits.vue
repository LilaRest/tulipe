<script setup>
import { computed } from "vue";
import { ethers } from "ethers";

const props = defineProps({
  modelValue: {},
  placeholder: {
    type: String,
  }
})
const emit = defineEmits(['update:modelValue'])

const units = ["wei", "gwei", "ether"]
let selectedUnit = $ref("wei");

function formatValue (val) {
  return ethers.utils.parseUnits(val, selectedUnit)
}
</script>

<template>
  <div class="InputUnits">
    <input @input="$emit('update:modelValue', formatValue($event.target.value))" type="text" :placeholder="props.placeholder"/>
    <select v-model="selectedUnit">
      <option v-for="unit in units" :value="unit">{{ unit }}</option>
    </select>
  </div>
</template>
