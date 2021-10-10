<template>
  <div>
    <div class="alert alert-dismissible fade show"
       :class="{'alert-danger': !dangerOrSucces, 'alert-success': dangerOrSucces}" role="alert"
       v-if="error">{{ error.message }}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  </div>
</template>

<script>
export default {
  name: "Error",
  props: ['error'],
  computed: {
    dangerOrSucces() {
      if (this.error.status === 'OK') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>

</style>
