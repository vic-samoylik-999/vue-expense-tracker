<script setup>
import Header from './components/Header.vue';
import Balance from './components/Balance.vue';
import IncomeExpenses from './components/IncomeExpenses.vue';
import TransactionList from './components/TransactionList.vue';
import AddTransaction from './components/AddTransaction.vue';
import { ref, computed, onMounted } from 'vue';
import { nanoid } from "nanoid"
import { useToast } from "vue-toastification";

// Dummy data
let transactions = ref([])

// Check LocalStorage
onMounted(() => {
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'))
  if (savedTransactions) transactions.value = savedTransactions
})

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

// Add new transaction
const handleTransactionSubmitted = (transactionData) => {
  transactions.value.push({
    id: nanoid(),
    text: transactionData.text,
    amount: transactionData.amount,
  })
  saveTransactionsLocacStorage()
}

// Delete transaction
const handleTransactionDelete = (id) => {
  const toast = useToast();
  toast.success(`The "${transactions.value.find(item => item.id === id).text}" was removed...`)
  transactions.value = transactions.value.filter(item => item.id !== id)
  saveTransactionsLocacStorage()
}

// Save transaction to LS
const saveTransactionsLocacStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions.value))
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
