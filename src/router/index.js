import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

import Layout from '@/components/layout'
import Course from '@/components/course'
import Subject from '@/components/subject'

export const constantRouterMap = [
    {path: '/login', component: () => import('@/components/login')},
    {path: '/xx', redirect: '/login',},
    // {path: '/404', component: () => import('@/views/404'), hidden: true},
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        name: 'home',
        children: [
            {
                path: 'home',
                name: 'home',
                meta: {title: '首页', icon: 'dashboard'},
                component: () => import('@/components/home/list.vue')
            }, {
                path: 'jobList',
                name: 'jobList',
                meta: {title: '作业列表', icon: 'dashboard'},
                component: () => import('@/components/job/list')
            },
            {
                path: 'scoreList',
                name: 'scoreList',
                meta: {title: '成绩列表', icon: 'dashboard'},
                component: () => import('@/components/score/list')
            }, {
                path: 'preview/:jobId/:id',
                name: 'preview',
                meta: {title: '作业预览', icon: 'dashboard'},
                component: () => import('@/components/preview')
            },
            {
                // path: 'video/:filePath/filename',
                path: 'video',
                name: 'previewVideo',
                meta: {title: '作业预览', icon: 'dashboard'},
                component: () => import('@/components/preview/video')
            }, {
                path: 'job/:id',
                name: 'job',
                redirect: 'job/:id/detail',
                meta: {title: '作业', icon: 'dashboard'},
                component: () => import('@/components/job'),
                children: [
                    {
                        path: 'detail',
                        name: 'detail',
                        meta: {title: '总览面板', icon: 'dashboard'},
                        component: () => import('@/components/job/detail')
                    }, {
                        path: 'edit',
                        name: 'edit',
                        meta: {title: '总览面板', icon: 'dashboard'},
                        component: () => import('@/components/job/edit')
                    }, {
                        path: 'history',
                        name: 'history',
                        meta: {title: '总览面板', icon: 'dashboard'},
                        component: () => import('@/components/job/history')
                    },
                ]
            }, {
                path: 'user',
                name: 'user',
                redirect: 'user/profile',
                meta: {title: '个人信息', icon: 'dashboard'},
                component: () => import('@/components/user'),
                children: [
                    {
                        path: 'profile',
                        name: 'profile',
                        meta: {title: '总览面板', icon: 'dashboard'},
                        component: () => import('@/components/user/profile')
                    }, {
                        path: 'password',
                        name: 'password',
                        meta: {title: '总览面板', icon: 'dashboard'},
                        component: () => import('@/components/user/password')
                    }, {
                        path: 'notify',
                        name: 'notify',
                        meta: {title: '总览面板', icon: 'dashboard'},
                        component: () => import('@/components/user/notify')
                    },
                    {
                        path: 'add',
                        name: 'add',
                        meta: {title: '总览面板', icon: 'dashboard'},
                        component: () => import('@/components/user/add')
                    }]
            }, {
                path: 'admin',
                name: 'admin',
                redirect: 'admin/category',
                meta: {title: '个人信息', icon: 'dashboard'},
                component: () => import('@/components/admin'),
                children: [
                    {
                        path: 'category',
                        name: 'category',
                        meta: {title: '总览面板', icon: 'dashboard'},
                        component: () => import('@/components/admin/category')
                    }, {
                        path: 'user',
                        name: 'adminUser',
                        meta: {title: '总览面板', icon: 'dashboard'},
                        component: () => import('@/components/admin/user')
                    }]
            },
            {
                path: 'subject',
                component: Subject,
                redirect: 'subject/list',
                meta: {title: '课程', icon: 'dashboard'},
                name: 'subject',
                children: [
                    {
                        path: 'list',
                        name: 'list',
                        meta: {title: '总览面板', icon: 'dashboard'},
                        component: () => import('@/components/subject/list')
                    }, {
                        path: 'create',
                        name: 'create',
                        meta: {title: '总览面板', icon: 'dashboard'},
                        component: () => import('@/components/subject/create')
                    }, {
                        path: 'manage',
                        name: 'manage',
                        meta: {title: '总览面板', icon: 'dashboard'},
                        component: () => import('@/components/subject/manage')
                    }, {
                        path: 'chapter',
                        name: 'chapter',
                        meta: {title: '总览面板', icon: 'dashboard'},
                        component: () => import('@/components/subject/chapter/index')
                    }, {
                        path: 'favor',
                        name: 'favor',
                        meta: {title: '总览面板', icon: 'dashboard'},
                        component: () => import('@/components/subject/favor')
                    },]
            },
            {
                path: 'course/:cid/',
                component: Course,
                redirect: 'course/:cid/announcement',
                meta: {title: '课程', icon: 'dashboard'},
                name: 'course',
                children: [{
                    path: 'announcement',
                    name: 'announcement',
                    meta: {title: '总览面板', icon: 'dashboard'},
                    component: () => import('@/components/announcement/courseAnnouncement')
                }, {
                    path: 'userHome',
                    name: 'userHome',
                    meta: {title: '总览面板', icon: 'dashboard'},
                    component: () => import('@/components/course/userHome')
                }, {
                    path: 'resource',
                    name: 'resource',
                    meta: {title: '总览面板', icon: 'dashboard'},
                    component: () => import('@/components/course/resource')
                }, {
                    path: 'comment',
                    name: 'comment',
                    meta: {title: '总览面板', icon: 'dashboard'},
                    component: () => import('@/components/comment')
                }, {
                    path: 'job',
                    name: 'courseJob',
                    meta: {title: '总览面板', icon: 'dashboard'},
                    component: () => import('@/components/course/jobList')
                }, {
                    path: 'chapter',
                    name: 'courseChapter',
                    meta: {title: '总览面板', icon: 'dashboard'},
                    component: () => import('@/components/course/chapter')
                }]
            },]
    },

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
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})
