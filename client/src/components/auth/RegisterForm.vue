<script setup>
import { ref } from 'vue';
const email = ref("");
const password = ref("");

async function register() {
    const data = {
        email: email.value,
        password: password.value
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(import.meta.env.VITE_API_URL + '/auth/register', options);
    const result = await response.json();
    // Do something with tokens. Add access token to localstorage or so
    console.log(result);
}

</script>

<template>
    <div>
        <form @submit.prevent="register">
            <input type="text" placeholder="Email" v-model="email" required>
            <input type="password" placeholder="Password" v-model="password" required>
            <button type="submit">Logga in</button>
        </form>
    </div>
</template>
