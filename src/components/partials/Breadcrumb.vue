<template>
  <div>
    <router-link :to="{name:'home'}" exact active-class="active" class="breadcrumb-item" tag="li">
      <a href="#">Anasayfa</a>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb"
}
</script>

<style scoped>

</style>
