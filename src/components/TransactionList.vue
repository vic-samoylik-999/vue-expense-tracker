<script setup>
const transactions = [
    { id: 1, text: "Flower", amout: -20.00 },
    { id: 2, text: "Paycheck", amout: 1120.00 },
    { id: 3, text: "Shirt", amout: -20.00 },
    { id: 4, text: "Grocery", amout: -20.00 },
    { id: 5, text: "Shoes", amout: -20.00 },
]
</script>

<template>
    <h3>History</h3>
    <ul id="list" class="list">
        <li v-for="transaction in transactions" :key="transaction.id" :class="transaction.amout < 0 ? 'minus' : 'plus'">
            {{ transaction.text }} <span>{{ transaction.amout }}</span><button class="delete-btn">x</button>
        </li>
    </ul>
</template>