import Vue from 'vue'

import './plugins/element.js'

import App from './App.vue'
import router from './router'
import store from './store'

import '@/permission' // permission control

Vue.config.productionTip = false;
import 'font-awesome/css/font-awesome.css'

new Vue({
    router,
    store,
    render: h => h(App),
    data: {
        uid: 1,
        isTch: true,
        courseId: 2
    }
}).$mount('#app');
