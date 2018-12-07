import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/comment'
        },
        {
            path: '/stuProfile',
            component: () => import('./components/stuProfile.vue')
        },
        {
            path: '/tchProfile',
            component: () => import('./components/tchProfile.vue')
        },
        {
            path: '/updatePwd',
            component: () => import( './components/changePwd.vue')
        },
        {
            path: '/qiniu',
            component: () => import( './components/qiniu.vue')
        },
        {
            path: '/notify',
            component: () => import( './components/notify.vue')
        },
        {
            path: '/comment',
            component: () => import( './components/comment.vue')
        }
    ]
})
