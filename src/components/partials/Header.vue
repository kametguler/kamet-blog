<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #563F7A">
      <router-link :to="{name:'home'}" active-class="active" tag="a" class="navbar-brand">Kamet Blog</router-link>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="#" active-class="active" exact tag="a" class="nav-link">Kategoriler</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'home'}" exact active-class="active" tag="a" class="nav-link">Postlar</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item" v-if="!loggedIn">
            <router-link :to="{name:'login'}" active-class="active" tag="a" class="nav-link">Giriş Yap</router-link>
          </li>
          <li class="nav-item" v-if="!loggedIn">
            <router-link :to="{name:'register'}" active-class="active" tag="a" class="nav-link">Kayıt Ol</router-link>
          </li>
          <div class="dropdown" v-if="loggedIn">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="true" v-if="getUserInfo != null">
              {{ getUserInfo.email }}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
              <a class="dropdown-item">Profil</a>
              <router-link :to="{name:'logout'}" tag="a" class="dropdown-item">Çıkış</router-link>
            </div>
          </div>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'Header',
  computed: {
    ...mapGetters([
      'loggedIn',
      'getUserInfo',
    ])
  },
}
</script>
<style>

</style>
