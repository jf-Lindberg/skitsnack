<script setup>
import Post from "../components/Post.vue";
const post = {
    id: "uji12919",
    title: "testing",
    content: "this is test content",
    published: true,
    author: "filip",
    authorId: String,
    likedBy: [],
    comments: []
}

</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
      <Post :post="post"/>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
