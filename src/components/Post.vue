<template>
  <div class="row">
    <div class="card single_post" v-for="post in getPosts" :key="post.id">
      <div class="body">
        <div class="img-post">
          <img class="d-block img-fluid" :src="post.image">
        </div>
        <div>
          <p class="text-small mb-3">{{ post.author }} | {{ post.created_at | dateFormat }} Yayınlandı |
            {{ post.updated_at | dateFormat }} Güncellendi</p>
        </div>
        <h3>
          <router-link :to="{name:'single-post', params: {slug: post.slug}}" tag="a">
            {{ post.title }}
          </router-link>
        </h3>
        <p v-html="$options.filters.truncate(post.content,350,'...')"></p>
      </div>
      <div class="footer">
        <div class="actions">
          <router-link :to="{name:'single-post', params: {slug: post.slug}}" tag="a" class="btn btn-outline-secondary">
            Okumaya Devam Et
          </router-link>
        </div>
        <ul class="stats">
          <li><a href="#">General</a></li>
          <li><a href="#" class="fa fa-heart">28</a></li>
          <li><a href="#" class="fa fa-comment">{{ post.comments.length }}</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import Comments from "@/components/partials/Comments";

export default {
  name: "Post",
  component: {
    Comments
  },
  data() {
    return {
      loader: true
    }
  },
  components: {},
  computed: {
    ...mapGetters([
      'getPosts'
    ])
  },
  created() {
    this.$store.loader = false
  },
  methods: {}
}
</script>

<style scoped>
body {
  background-color: #f4f7f6;
  margin-top: 20px;
}

.card {
  background: #fff;
  transition: .5s;
  border: 0;
  margin-bottom: 30px;
  border-radius: .55rem;
  position: relative;
  width: 100%;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
}

.card .body {
  color: #444;
  padding: 20px;
  font-weight: 400;
}

.card .header {
  color: #444;
  padding: 20px;
  position: relative;
  box-shadow: none;
}

.single_post {
  -webkit-transition: all .4s ease;
  transition: all .4s ease
}

.single_post .body {
  padding: 30px
}

.single_post .img-post {
  position: relative;
  overflow: hidden;
  max-height: 500px;
  margin-bottom: 30px
}

.single_post .img-post > img {
  -webkit-transform: scale(1);
  -ms-transform: scale(1);
  transform: scale(1);
  opacity: 1;
  -webkit-transition: -webkit-transform .4s ease, opacity .4s ease;
  transition: transform .4s ease, opacity .4s ease;
  max-width: 100%;
  filter: none;
  -webkit-filter: grayscale(0);
  -webkit-transform: scale(1.01)
}

.single_post .img-post:hover img {
  -webkit-transform: scale(1.02);
  -ms-transform: scale(1.02);
  transform: scale(1.02);
  opacity: .7;
  filter: gray;
  -webkit-filter: grayscale(1);
  -webkit-transition: all .8s ease-in-out
}

.single_post .img-post:hover .social_share {
  display: block
}

.single_post .footer {
  padding: 0 30px 30px 30px
}

.single_post .footer .actions {
  display: inline-block
}

.single_post .footer .stats {
  cursor: default;
  list-style: none;
  padding: 0;
  display: inline-block;
  float: right;
  margin: 0;
  line-height: 35px
}

.single_post .footer .stats li {
  border-left: solid 1px rgba(160, 160, 160, 0.3);
  display: inline-block;
  font-weight: 400;
  letter-spacing: 0.25em;
  line-height: 1;
  margin: 0 0 0 2em;
  padding: 0 0 0 2em;
  text-transform: uppercase;
  font-size: 13px
}

.single_post .footer .stats li a {
  color: #777
}

.single_post .footer .stats li:first-child {
  border-left: 0;
  margin-left: 0;
  padding-left: 0
}

.single_post h3 {
  font-size: 20px;
  text-transform: uppercase
}

.single_post h3 a {
  color: #242424;
  text-decoration: none
}

.single_post p {
  font-size: 16px;
  line-height: 26px;
  font-weight: 300;
  margin: 0
}

.single_post .blockquote p {
  margin-top: 0 !important
}

.single_post .meta {
  list-style: none;
  padding: 0;
  margin: 0
}

.single_post .meta li {
  display: inline-block;
  margin-right: 15px
}

.single_post .meta li a {
  font-style: italic;
  color: #959595;
  text-decoration: none;
  font-size: 12px
}

.single_post .meta li a i {
  margin-right: 6px;
  font-size: 12px
}

.single_post2 {
  overflow: hidden
}

.single_post2 .content {
  margin-top: 15px;
  margin-bottom: 15px;
  padding-left: 80px;
  position: relative
}

.single_post2 .content .actions_sidebar {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 60px
}

.single_post2 .content .actions_sidebar a {
  display: inline-block;
  width: 100%;
  height: 60px;
  line-height: 60px;
  margin-right: 0;
  text-align: center;
  border-right: 1px solid #e4eaec
}

.single_post2 .content .title {
  font-weight: 100
}

.single_post2 .content .text {
  font-size: 15px
}

.right-box .categories-clouds li {
  display: inline-block;
  margin-bottom: 5px
}

.right-box .categories-clouds li a {
  display: block;
  border: 1px solid;
  padding: 6px 10px;
  border-radius: 3px
}

.right-box .instagram-plugin {
  overflow: hidden
}

.right-box .instagram-plugin li {
  float: left;
  overflow: hidden;
  border: 1px solid #fff
}

.comment-reply li {
  margin-bottom: 15px
}

.comment-reply li:last-child {
  margin-bottom: none
}

.comment-reply li h5 {
  font-size: 18px
}

.comment-reply li p {
  margin-bottom: 0px;
  font-size: 15px;
  color: #777
}

.comment-reply .list-inline li {
  display: inline-block;
  margin: 0;
  padding-right: 20px
}

.comment-reply .list-inline li a {
  font-size: 13px
}

@media (max-width: 640px) {
  .blog-page .left-box .single-comment-box > ul > li {
    padding: 25px 0
  }

  .blog-page .left-box .single-comment-box ul li .icon-box {
    display: inline-block
  }

  .blog-page .left-box .single-comment-box ul li .text-box {
    display: block;
    padding-left: 0;
    margin-top: 10px
  }

  .blog-page .single_post .footer .stats {
    float: none;
    margin-top: 10px
  }

  .blog-page .single_post .body,
  .blog-page .single_post .footer {
    padding: 30px
  }
}
</style>
