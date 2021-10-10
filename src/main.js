import Vue from 'vue'
import App from './App.vue'
import {router} from "@/router";
import {store} from './store/store'
import moment from 'moment'

Vue.filter('truncate', function (text, length = 250, suffix) {
    if (text.length > length) {
        return text.substring(0, length) + suffix;
    } else {
        return text;
    }
});


Vue.config.productionTip = false
Vue.filter('dateFormat', function (timestamp) {
    if (timestamp) {
        return moment(String(timestamp)).format('MM/DD/YYYY hh:mm')
    }
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (store.getters.loggedIn) {
            next({
                name: 'home',
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
})
