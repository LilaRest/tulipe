<script setup>
import { dapp } from "../../../../src/index.js";
dapp.contracts.Lock.watch("specialNumber", [], () => {
    console.log("specialNumber changed from OtherComponent");
})
</script>

<template>
    <b>OTHER COMPONENT</b>
</template>
