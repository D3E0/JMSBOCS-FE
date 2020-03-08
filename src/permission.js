import router from './router'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import {getToken} from '@/utils/auth' // getToken from cookie

NProgress.configure({showSpinner: false});// NProgress Configuration

const whiteList = ['/login'];// no redirect whitelist

router.beforeEach((to, from, next) => {
    NProgress.start(); // start progress bar
    if (getToken()) { // determine if there has token
        /* has token*/
        if (to.path === '/login') {
            console.info('1');
            next({path: '/'});
            NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
        } else {
            if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
                console.info('2');
                store.dispatch('GetInfo').then(res => { // 拉取user_info
                    console.log(res.data);
                    next()
                }).catch((err) => {
                    // store.dispatch('FedLogOut').then(() => {
                    //     Message.error(err || 'Verification failed, please login again');
                    //     next({path: '/'})
                    // })
                })
            } else {
                console.info('3');
                next()
            }
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            console.info('4');
            next()
        } else {
            console.info('5');
            console.info(to);
            // next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
            next(`/login`); // 否则全部重定向到登录页
            NProgress.done()
        }
    }
});

router.afterEach(() => {
    NProgress.done() // finish progress bar
});
