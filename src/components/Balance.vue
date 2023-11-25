<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    total: {
        type: String,
        require: true
    }
})
</script>

<template>
    <h4>Your Balance</h4>
    <h1 id="balance">${{ props.total }}</h1>
</template>