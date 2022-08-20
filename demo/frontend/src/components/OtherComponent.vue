<script setup>
import { dapp } from "../../../../src/index.js";

dapp.contracts.onSafe(function (component) {
    dapp.contracts.Lock.watch("specialNumber", [], () => {
        console.log("specialNumber changed from OtherComponent");
    }, component)
})
</script>

<template>
    <b>OTHER COMPONENT</b>
</template>
