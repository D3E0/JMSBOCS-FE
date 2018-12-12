import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/subject'
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
            path: '/subject',
            component: () => import( './components/Subject.vue'),
            children: [
                {
                    path: '',
                    redirect: "list"
                },
                {
                    path: 'list',
                    component: () => import( './components/SubjectList.vue')
                },
                {
                    path: 'create',
                    component: () => import( './components/SubjectCreate.vue')
                },
                {
                    path: 'manage',
                    component: () => import( './components/SubjectManage.vue')
                },
            ]
        },
        {
            path: '/course/:cid',
            name: "course",
            component: () => import( './components/Course.vue'),
            children: [
                {
                    path: '',
                    redirect: "announcement"
                },
                {
                    path: 'comment',
                    props: true,
                    component: () => import( './components/comment.vue')
                },
                {
                    path: 'announcement',
                    props: true,
                    component: () => import( './components/Announcement.vue')
                },
                {
                    path: 'resource',
                    props: true,
                    component: () => import( './components/Resource.vue')
                },
                {
                    path: 'userhome',
                    props: true,
                    component: () => import( './components/UserHome.vue')
                },
            ]
        }
    ]
})
