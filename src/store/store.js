import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
        userInformation: localStorage.getItem('userInfo') || null,
        posts: [],
        errors: [],
        lastFivePost: [],
    },
    plugins: [
        createPersistedState({
            key: 'userInfo',
            paths: ['userInformation'],
        })
    ],
    getters: {
        loggedIn(state) {
            return state.token != null
        },
        getPosts(state) {
            return state.posts
        },
        getUserInfo(state) {
            if (state.token != null) {
                return state.userInformation
            } else {
                console.log('Giriş yapan yok')
            }
        },
        getLastFivePosts(state) {
            return state.lastFivePost
        }
    },
    mutations: {
        updatePostList(state, posts) {
            for (let i = 0; i < posts.length; i++) {
                state.posts.push(posts[i])
            }
        },
        updateToken(state, token) {
            state.token = token
        },
        destroyToken(state) {
            state.token = null
        },
        updateUserInformation(state, userInfo) {
            state.userInformation = userInfo.data
        },
        destroyUserInfo(state) {
            state.userInformation = null
        },
        updateLastFivePosts(state, payload) {
            state.lastFivePost = payload.data
        }
    },
    actions: {
        initApp({commit}) {
            axios.get('http://127.0.0.1:8000/api/posts/')
                .then(response => {
                    let data = response.data
                    commit("updatePostList", data);
                })
                .catch(error => {
                    this.errors.push(error)
                })
        },
        retrieveToken(context, credentials) {
            return new Promise((resolve, reject) => {
                axios.post("http://127.0.0.1:8000/api/rest-auth/login/", {
                    username: credentials.username,
                    password: credentials.password,
                }).then(response => {
                    const token = 'Token ' + response.data.key
                    localStorage.setItem('access_token', token)
                    context.commit('updateToken', token)
                    resolve(response.data)
                }).catch(error => {
                    reject(error.response)
                })
            })
        },
        destroyToken(context) {
            localStorage.removeItem('access_token')
            if (context.getters.loggedIn) {
                return new Promise((resolve, reject) => {
                    axios.post("http://127.0.0.1:8000/api/rest-auth/logout/")
                        .then(response => {
                            localStorage.removeItem('access_key')
                            context.commit('destroyToken')
                            resolve(response)
                        })
                        .catch(error => {
                            localStorage.removeItem('access_key')
                            context.commit('destroyToken')
                            reject(error)
                        })
                })
            }
        },
        registerUser(context, userInfo) {
            return new Promise((resolve, reject) => {
                axios.post('http://127.0.0.1:8000/api/rest-auth/registration/', {
                    username: userInfo.username,
                    password1: userInfo.password1,
                    password2: userInfo.password2,
                    email: userInfo.email,
                }).then(response => {
                    resolve(response.data)
                }).catch(error => {
                    reject(error.response)
                })
            })
        },
        destroyUserInfo(context) {
            localStorage.removeItem('userInfo')
            context.commit('destroyUserInfo')
        },
        getUserInformation(context, token) {
            return new Promise((resolve, reject) => {
                axios.get('http://127.0.0.1:8000/api/rest-auth/user/', {
                    headers: {
                        'Authorization': token,
                    },
                })
                    .then(response => {
                        resolve(response)
                        context.commit('updateUserInformation', response)
                    }).catch(error => {
                    reject(error.response)
                })
            })
        },
        doUserComment(context, payload) {
            return new Promise((resolve, reject) => {
                axios.post("http://127.0.0.1:8000/api/comments/", {comment: payload.comment, post: payload.post_id},
                    {headers: {'Authorization': localStorage.getItem('access_token')}}
                ).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getLastFivePost(context) {
            return new Promise((resolve, rejecet) => {
                axios.get('http://127.0.0.1:8000/api/last-five-posts/')
                    .then((response) => {
                        resolve(response)
                        context.commit('updateLastFivePosts', response)
                    })
                    .catch((error) => {
                        rejecet(error)
                    })
            })
        }
    }
})
