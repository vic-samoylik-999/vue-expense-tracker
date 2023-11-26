<script setup>
import Header from './components/Header.vue';
import Balance from './components/Balance.vue';
import IncomeExpenses from './components/IncomeExpenses.vue';
import TransactionList from './components/TransactionList.vue';
import AddTransaction from './components/AddTransaction.vue';
import { ref, computed } from 'vue';
import { nanoid } from "nanoid"
import { useToast } from "vue-toastification";

// Dummy data
let transactions = ref([
  { id: nanoid(), text: "Flower", amount: -20.25 },
  { id: nanoid(), text: "Paycheck", amount: 1120.00 },
  { id: nanoid(), text: "Shirt", amount: -20.00 },
  { id: nanoid(), text: "Grocery", amount: -20.50 },
  { id: nanoid(), text: "Shoes", amount: -20.00 },
])

// Get total
const total = computed(() => {
  return transactions.value
    .reduce((acc, item) => {
      return acc + item.amount;
    }, 0)
    .toFixed(2)
})

// Get income
const income = computed(() => {
  return transactions.value
    .filter(item => item.amount > 0)
    .reduce((acc, item) => {
      return acc + item.amount
    }, 0)
    .toFixed(2)
})

// Get expenses
const expenses = computed(() => {
  return transactions.value
    .filter(item => item.amount <= 0)
    .reduce((acc, item) => {
      return acc + item.amount
    }, 0)
    .toFixed(2)
})

const handleTransactionSubmitted = (transactionData) => {
  transactions.value.push({
    id: nanoid(),
    text: transactionData.text,
    amount: transactionData.amount,
  })
}

const handleTransactionDelete = (id) => {
  const toast = useToast();
  toast.info(`The item: "${transactions.value.find(item => item.id === id).text}" was removed...`)
  transactions.value = transactions.value.filter(item => item.id !== id)

}

</script>

<template>
  <Header />
  <div class="container">
    <Balance :total="total" />
    <IncomeExpenses :income="+income" :expenses="+expenses" />
    <TransactionList @transactionDelete="handleTransactionDelete" :transactions="transactions" />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
  </div>
</template>

<style scoped></style>
