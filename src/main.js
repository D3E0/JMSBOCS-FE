import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App),
    data: {
        uid: 1,
        isTch: false,
        courseId: 2
    }
}).$mount('#app');
