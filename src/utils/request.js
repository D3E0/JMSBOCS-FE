import axios from 'axios'
import store from '../store'
import qs from 'qs'
import {getToken} from "./auth";

// 创建axios实例
const service = axios.create({
    // baseURL: 'http://localhost:8080', // api 的 base_url
    timeout: 30000, // 请求超时时间
    transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return qs.stringify(data)
    }]
});

// request拦截器
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        return config
    },
    error => {
        // Do something with request error
        console.log(error);// for debug
        Promise.reject(error)
    }
);

// response 拦截器
service.interceptors.response.use(
    response => {
        if (response.data.code === 200) {
            return response.data
        }
        let error = response.data;
        return Promise.reject(new Error('fail ' + JSON.stringify(error)))
    },
    error => {
        console.log('err ' + error); // for debug
        return Promise.reject(error)
    }
);

export default service
