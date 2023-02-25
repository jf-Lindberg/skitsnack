<script setup>
import SinglePost from "../components/SinglePost.vue";
import LoginForm from "../components/auth/LoginForm.vue";
import RegisterForm from "../components/auth/RegisterForm.vue";

const post = {
    id: "uji12919",
    title: "testing",
    content: "this is test content",
    published: true,
    createdAt: Date(),
    author: "filip",
    authorId: "lköasdjfjlkadsklöfjlköadsfj",
    likedBy: [],
    comments: []
}
</script>

<template>
    <div class="grid place-items-center">
        <h1 class="font-bold text-xl">This is a test view</h1>
<!--        <SinglePost :post="post"/>-->
        <RegisterForm/>
    </div>
</template>

<style>
</style>
