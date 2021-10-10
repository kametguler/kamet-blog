<template>
  <div>
    <Header></Header>
    <transition appear name="fade" mode="out-in">
      <router-view/>
    </transition>
    <Footer></Footer>

  </div>
</template>

<script>
import Header from './components/partials/Header.vue'
import Footer from "@/components/partials/Footer";
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      data: [],
      loader: true,
    }
  },
  computed: {
    ...mapGetters([
      'loggedIn'
    ])
  },
  methods: {
    ...mapActions([
      "initApp",
    ]),
  },
  created() {
    this.initApp()
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
