<script setup lang="ts">
import type {Post} from "@/interfaces/Post";
defineProps<{post: Post;}>();
</script>

<template>
    <p class="font-black">{{ post.id }}</p>
    <p>{{ post.title }}</p>
</template>
