import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

import Layout from '@/components/layout'

export const constantRouterMap = [
    {path: '/login', component: () => import('@/components/login')},
    // {path: '/home', component: () => import('../components/Home.vue')},
    // {path: '/404', component: () => import('@/views/404'), hidden: true},

    {
        path: '/',
        component: Layout,
        redirect: '/home',
        name: 'Home',
        children: [{
            path: 'home',
            meta: {title: '总览面板', icon: 'dashboard'},
            component: () => import('@/components/layout/Head.vue')
        }]
    }
];

export const asyncRouterMap = [
    // chartsRouter,
    // {
    //     path: '/message',
    //     component: layout,
    //     children: [{
    //         path: 'index',
    //         name: 'Message',
    //         meta: {title: '消息中心', icon: 'session'},
    //         component: () => import('@/views/message/index')
    //     }]
    // },
    // {
    //     path: '/session',
    //     component: layout,
    //     children: [{
    //         path: 'index',
    //         name: 'Session',
    //         meta: {title: '会话管理', icon: 'session'},
    //         component: () => import('@/views/session/index')
    //     }]
    // },
    // {
    //     path: '/staff',
    //     component: layout,
    //     children: [{
    //         path: 'index',
    //         name: 'staff',
    //         meta: {title: '客服管理', icon: 'staff'},
    //         component: () => import('@/views/customerService/index')
    //     }]
    // },
    // {
    //     path: '/question',
    //     component: layout,
    //     children: [{
    //         path: 'index',
    //         name: 'question',
    //         meta: {title: '知识库管理', icon: 'question'},
    //         component: () => import('@/views/question/index')
    //     }]
    // },
    // {
    //     path: '/shortcut',
    //     component: layout,
    //     children: [{
    //         path: 'index',
    //         name: 'Shortcut',
    //         meta: {title: '问候语管理', icon: 'shortcut'},
    //         component: () => import('@/views/shortcut/index')
    //     }]
    // },
    // {
    //     path: 'external-link',
    //     component: layout,
    //     children: [
    //         {
    //             path: 'http://139.224.239.13:9998/views/service.html',
    //             meta: {title: '服务页面', icon: 'kefu'}
    //         }
    //     ]
    // },

    {path: '*', redirect: '/404', hidden: true}
];

export default new Router({
    mode: 'history', //后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})
