<template>
  <div>
    <div class="container">
      <div class="be-comment-block">
        <h1 class="mb-3" v-if="comments.length === 0">İlk yorumu sen yap !!</h1>
        <h1 class="comments-title">Yorumlar ({{ comments.length }})</h1>
        <div class="be-comment" v-for="comment in comments" :key="comment.id">
          <div class="be-img-comment">
            <a href="#">
              <img src="../../assets/images/no_resim_erkek.png" class="be-ava-comment">
            </a>
          </div>
          <div class="be-comment-content">

				<span class="be-comment-name">
					<a href="#"> {{ comment.owner }}</a>
					</span>
            <span class="be-comment-time">
					<i class="fa fa-clock-o"></i>
					{{ comment.created_at | dateFormat }}
				</span>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"
                    @click="deleteComment(comment.id)" v-if="canIDelete(comment.owner)">
              <span aria-hidden="true">&times;</span>
            </button>
            <p class="be-comment-text">
              {{ comment.comment }}
            </p>
          </div>
        </div>
        <error v-if="error.message" :error="error"></error>
        <form class="form-block">
          <div class="row">
            <div class="col-xs-12 col-sm-6">
              <div class="form-group fl_icon" v-if="!this.loggedIn">
                <div class="icon"><i class="fa fa-user"></i></div>
                <input class="form-input" type="text" placeholder="Adınız Soyadınız"
                       v-model="this.nameSurname">
              </div>
              <p v-if="this.loggedIn">{{ getUserInfo.first_name }} {{ getUserInfo.last_name }}</p>
            </div>
            <div class="col-xs-12 col-sm-6 fl_icon" v-if="!this.loggedIn">
              <div class="form-group fl_icon">
                <div class="icon"><i class="fa fa-envelope-o"></i></div>
                <input class="form-input" type="text"
                       placeholder="Email Adresiniz (Hiçkimseyle paylaşılmayacaktır!)" :v-model="this.email">
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <textarea class="form-control" placeholder="Yorumunuzu buraya yazınız..."
                          v-model="commentMessage"></textarea>
              </div>
            </div>
            <a class="btn btn-primary text-white" @click="YorumYap">Yorum Yap</a>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Error from "@/components/partials/Error";
import {mapGetters} from "vuex";

export default {
  name: "Comments",
  components: {
    Error,
  },
  props: ['post_id'],
  data() {
    return {
      comments: {},
      error: {
        message: '',
        status: '',
      },
      email: '',
      nameSurname: '',
      commentMessage: '',
    }
  },
  created() {
    axios.get("http://127.0.0.1:8000/api/comments/?search=" + this.post_id)
        .then((response) => {
          this.comments = response.data
        }).catch((error) => {
      this.error = error.message
    })
  },
  computed: {
    ...mapGetters([
      'loggedIn',
      "getUserInfo"
    ]),
  },
  methods: {
    canIDelete(value) {
      if (this.loggedIn) {
        if (value == this.getUserInfo.username) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    deleteComment(commentId) {
      axios.delete(`http://127.0.0.1:8000/api/comments/${commentId}`, {
        headers: {'Authorization': localStorage.getItem('access_token')}
      }).then(() => {
        axios.get("http://127.0.0.1:8000/api/comments/?search=" + this.post_id)
            .then((response) => {
              this.comments = response.data
            }).catch((error) => {
          this.error = error.response
        })
      }).catch(() => {
        alert('silerken hata')
      })
    },
    YorumYap() {
      if (this.loggedIn) {
        if (this.commentMessage != '') {
          this.$store.dispatch('doUserComment', {post_id: this.post_id, comment: this.commentMessage})
              .then(() => {
                this.commentMessage = ''
                this.error.status = 'OK'
                this.error.message = 'Yorum gönderildi!'
                axios.get("http://127.0.0.1:8000/api/comments/?search=" + this.post_id)
                    .then((response) => {
                      this.comments = response.data
                    }).catch((error) => {
                  this.error = error.response
                })
              }).catch(error => {
            this.error.message = error.response.data.comment[0]
          })
        } else {
          this.error.message = 'Yorum alanı boş bırakılmamalı!'
        }
      }
      //else {
      //   if (this.email == '' || this.nameSurname == '' || this.commentMessage == '') {
      //     alert('hata')
      //   } else {
      //     alert('şu an yorum yapamazsın')
      //   }
      // }
    }
  },
}
</script>

<style scoped>
body {
  margin-top: 20px;
  background-color: #e9ebee;
}

.be-comment-block {
  margin-bottom: 50px !important;
  border: 1px solid #edeff2;
  border-radius: 2px;
  padding: 50px 20px;
  border: 1px solid #ffffff;
}

.comments-title {
  font-size: 16px;
  color: #262626;
  margin-bottom: 15px;
  font-family: 'Conv_helveticaneuecyr-bold';
}

.be-img-comment {
  width: 60px;
  height: 60px;
  float: left;
  margin-bottom: 15px;
}

.be-ava-comment {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.be-comment-content {
  margin-left: 80px;
}

.be-comment-content span {
  display: inline-block;
  width: 49%;
  margin-bottom: 15px;
}

.be-comment-name {
  font-size: 13px;
  font-family: 'Conv_helveticaneuecyr-bold';
}

.be-comment-content a {
  color: #383b43;
}

.be-comment-content span {
  display: inline-block;
  width: 49%;
  margin-bottom: 15px;
}

.be-comment-time {
  text-align: right;
}

.be-comment-time {
  font-size: 11px;
  color: #b4b7c1;
}

.be-comment-text {
  font-size: 13px;
  line-height: 18px;
  color: #7a8192;
  display: block;
  background: #f6f6f7;
  border: 1px solid #edeff2;
  padding: 15px 20px 20px 20px;
}

.form-group.fl_icon .icon {
  position: absolute;
  top: 1px;
  left: 16px;
  width: 48px;
  height: 48px;
  background: #f6f6f7;
  color: #b5b8c2;
  text-align: center;
  line-height: 50px;
  -webkit-border-top-left-radius: 2px;
  -webkit-border-bottom-left-radius: 2px;
  -moz-border-radius-topleft: 2px;
  -moz-border-radius-bottomleft: 2px;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
}

.form-group .form-input {
  font-size: 13px;
  line-height: 50px;
  font-weight: 400;
  color: #b4b7c1;
  width: 100%;
  height: 50px;
  padding-left: 20px;
  padding-right: 20px;
  border: 1px solid #edeff2;
  border-radius: 3px;
}

.form-group.fl_icon .form-input {
  padding-left: 70px;
}

.form-group textarea.form-input {
  height: 150px;
}


</style>
