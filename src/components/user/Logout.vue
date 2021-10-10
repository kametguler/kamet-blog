<template>
  <div></div>
</template>

<script>
export default {
  name: "Logout",
  created() {
    this.$store.dispatch('destroyToken')
        .then(() => {
          this.$router.push({name: 'home'})
        })
    this.$store.dispatch('destroyUserInfo')
  },
}
</script>

<style scoped>

</style>
