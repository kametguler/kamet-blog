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
                  <h3 class="login-heading mb-4">Tekradan Hoşgeldin!</h3>

                  <!-- Sign In Form -->
                  <form @submit.prevent="login">
                    <error v-if="error.message" :error="error"></error>
                    <div class="form-floating mb-3">
                      <label for="floatingInput">Kullanıcı Adı</label>
                      <input type="text" class="form-control" id="floatingInput" v-model="user.username">
                    </div>
                    <div class="form-floating mb-3">
                      <label for="floatingPassword1">Şifre</label>
                      <input type="password" class="form-control" id="floatingPassword1" v-model="user.password">
                    </div>
                    <div class="form-check mb-3">
                      <input class="form-check-input" type="checkbox" value="" id="rememberPasswordCheck">
                      <label class="form-check-label" for="rememberPasswordCheck">
                        Beni hatırla
                      </label>
                    </div>
                    <div class="d-grid">
                      <button class="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                              :disabled="!disabledOrNot" type="submit">Giriş
                        Yap
                      </button>
                      <div class="text-center">
                        <a class="small" href="#">Şifremi unuttum</a>
                      </div>
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
  name: "Login",
  components: {
    Error,
  },
  data() {
    return {
      user: {
        username: null,
        password: null,
      },
      logged: null,
      error: {
        message: '',
        status: ''
      }
    }
  },
  methods: {
    login() {
      this.$store.dispatch('retrieveToken', this.user)
          .then((response) => {
            if (response.key) {
              this.error.message = ''
              this.error.status = ''
              this.error.status = 'OK'
              this.error.message = 'Başarıyla giriş yaptınız'
            }
            setTimeout(() => {
              this.$router.push({name: 'home'})
              this.$store.dispatch('getUserInformation', this.$store.state.token)
            }, 2000)
          }).catch((error) => {
        this.error.message = ''
        this.error.status = ''
        this.error.message = error.data.non_field_errors[0]
        this.error.status = error.data.status
      })

    },
  },
  computed: {
    disabledOrNot() {
      if (this.user.username != null && this.user.password != null) {
        return true
      } else {
        return false
      }
    },
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
