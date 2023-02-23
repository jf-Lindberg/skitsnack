<script setup lang="ts">
import type {Post} from "@/interfaces/Post";
const props = defineProps<{post: Post;}>();
</script>

<template>
    <p>{{ post.id }}</p>
    <p>{{ post.title }}</p>
</template>
