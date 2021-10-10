<template>
  <div>
    <h4 class="text-center">Son Yazılar</h4>
    <ul class="list-group">
      <li class="list-group-item justify-content-between d-flex flex-column" v-for="last in getLastFivePosts" :key="last.id">
        <p class="text-small">{{ last.created_at | dateFormat }}</p>
        <a :href="`http://localhost:8080/post/${last.slug}`">{{ last.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Sidebar",
  computed: {
    ...mapGetters([
      'getLastFivePosts'
    ])
  },
  created() {
    this.$store.dispatch('getLastFivePost')
  }
}
</script>

<style scoped>

</style>
