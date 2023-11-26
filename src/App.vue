<script setup>
import Header from './components/Header.vue';
import Balance from './components/Balance.vue';
import IncomeExpenses from './components/IncomeExpenses.vue';
import TransactionList from './components/TransactionList.vue';
import AddTransaction from './components/AddTransaction.vue';
import { ref, computed } from 'vue';

// Dummy data
const transactions = ref([
  { id: 1, text: "Flower", amount: -20.25 },
  { id: 2, text: "Paycheck", amount: 1120.00 },
  { id: 3, text: "Shirt", amount: -20.00 },
  { id: 4, text: "Grocery", amount: -20.50 },
  { id: 5, text: "Shoes", amount: -20.00 },
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
</script>

<template>
  <Header />
  <div class="container">
    <Balance :total="total" />
    <IncomeExpenses :income="+income" :expenses="+expenses" />
    <TransactionList :transactions="transactions" />
    <AddTransaction />
  </div>
</template>

<style scoped></style>
