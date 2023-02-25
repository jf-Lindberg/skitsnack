<script setup>
import { ref } from 'vue';
const email = ref("");
const password = ref("");

function login() {
    console.log(email.value);
    console.log(password.value);
}

</script>

<template>
    <div>
        <form @submit.prevent="login">
            <input type="text" placeholder="Email" v-model="email">
            <input type="password" placeholder="Password" v-model="password">
            <button type="submit">Logga in</button>
        </form>
    </div>
</template>
