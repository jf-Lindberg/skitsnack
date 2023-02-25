<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <header>
        <nav>
            <RouterLink to="/test">Test</RouterLink>
        </nav>
    </header>

    <RouterView/>
</template>

<style scoped>
</style>
