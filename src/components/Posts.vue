<template>
  <div class="container-fluid">
    <div class="row mt-5 mx-auto">
      <div class="col-9">
        <Post></Post>
      </div>
      <div class="col-3">
        <sidebar></sidebar>
      </div>
    </div>
  </div>
</template>

<script>
import Post from "@/components/Post";
import Sidebar from "@/components/partials/Sidebar";

export default {
  name: "Posts",
  components: {
    Post,
    Sidebar,
  },
  data() {
    return {
      posts: []
    }
  },
}
</script>

<style scoped>

</style>
