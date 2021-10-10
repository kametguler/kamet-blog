<template>
  <div class="container mt-5">
    <div class="container-fluid ps-md-0">
      <div class="row g-0">
        <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
        <div class="col-md-8 col-lg-6">
          <div class="login d-flex align-items-center py-5">
            <div class="container">
              <div class="row">
                <div class="col-md-9 col-lg-8 mx-auto">
                  <h3 class="login-heading mb-4">Kayıt ol!</h3>

                  <!-- Sign In Form -->
                  <form @submit.prevent="register">
                    <error v-if="error.message" :error="error"></error>
                    <div class="form-floating mb-3">
                      <label for="floatingEmail">Email Adresi</label>
                      <input type="email" class="form-control" id="floatingEmail" v-model="user.email">
                    </div>
                    <div class="form-floating mb-3">
                      <label for="floatingInput">Kullanıcı Adı</label>
                      <input type="text" class="form-control" id="floatingInput" v-model="user.username">
                    </div>
                    <div class="form-floating mb-3">
                      <label for="floatingPassword1">Şifre</label>
                      <input type="password" class="form-control" id="floatingPassword1" v-model="user.password1">
                    </div>
                    <div class="form-floating mb-3">
                      <label for="floatingPassword2">Şifre Tekrarı</label>
                      <input type="password" class="form-control" id="floatingPassword2" v-model="user.password2">
                    </div>
                    <div class="form-check mb-3">
                      <input class="form-check-input" type="checkbox" value="" id="rememberPasswordCheck">
                      <label class="form-check-label" for="rememberPasswordCheck">
                        Beni hatırla
                      </label>
                    </div>
                    <div class="d-grid d-flex justify-content-between">
                      <button class="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                              :disabled="!disabledOrNot" type="submit">Giriş
                        Yap
                      </button>
                      <a class="small my-auto" href="#">Şifremi unuttum</a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Error from "@/components/partials/Error";

export default {
  name: "Register",
  components: {
    Error,
  },
  data() {
    return {
      user: {
        username: null,
        password1: null,
        password2: null,
        email: null,
      },
      error: {
        message: '',
        status: ''
      },
    }
  },
  methods: {
    register() {
      if (this.user.username != null && this.user.email != null && this.user.password1 != null && this.user.password2 != null) {
        if (this.user.password1 === this.user.password2) {
          this.$store.dispatch('registerUser', this.user)
              .then(response => {
                if (response.key) {
                  this.error.status = ''
                  this.error.status = 'OK'
                  this.error.message = 'Kaydınız başarıyla gerçekleşti!'
                }
                // this.$router.push({name: 'login'})
              })
              .catch(e => {
                this.error.message = ''
                this.error.status = e.status
                if (e.data.username) {
                  this.error.message += e.data.username[0]
                }
                if (e.data.email) {
                  this.error.message += e.data.email[0]
                }
                if (e.data.password1) {
                  this.error.message += e.data.password1[0]
                  if (e.data.password1[1]) {
                    this.error.message += e.data.password1[1]
                    if (e.data.password1[2]) {
                      this.error.message += e.data.password1[2]
                    }
                  }
                }
              })
        } else {
          this.error = 'Şifreler uyuşmuyor'
        }
      } else {
        this.error = 'Boş içerik bırakma!'
      }
    },
  },
  computed: {
    disabledOrNot() {
      if (this.user.username != null && this.user.email != null && this.user.password1 != null && this.user.password2 != null) {
        return true
      } else {
        return false
      }
    }
  },
}
</script>

<style scoped>
.login {
  height: 80vh;
}

.bg-image {
  background-image: url('https://source.unsplash.com/WEQbe2jBg40/600x1200');
  background-size: cover;
  background-position: center;
}

.login-heading {
  font-weight: 300;
}

.btn-login {
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
  padding: 0.75rem 1rem;
}

</style>
