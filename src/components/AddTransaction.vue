<script setup>
import { defineProps, ref } from 'vue';
import { useToast } from "vue-toastification";

const toast = useToast();
const emit = defineEmits(['transactionSubmitted'])

const props = defineProps({
    transactions: {
        type: Array,
        reqiuired: true
    }
})

const text = ref('')
const amount = ref('')

const onSubmit = () => {
    if (!text.value || !amount.value) {
        toast.error('Both fields must be filled...')
        return
    }
    toast.success(`Success! You added ${text.value}: ${amount.value}`)
    const transactionData = {
        text: text.value,
        amount: amount.value
    }
    emit('transactionSubmitted', transactionData)
    text.value = ''
    amount.value = ''
}
</script>

<template>
    <h3>Add new transaction</h3>
    <form id="form" @submit.prevent="onSubmit">
        <div class="form-control">
            <label for="text">Text</label>
            <input v-model="text" type="text" id="text" placeholder="Enter text..." />
        </div>
        <div class="form-control">
            <label for="amount">Amount <br />
                (negative - expense, positive - income)</label>
            <input v-model="amount" type="number" id="amount" placeholder="Enter amount..." />
        </div>
        <button class="btn">Add transaction</button>
    </form>
</template>