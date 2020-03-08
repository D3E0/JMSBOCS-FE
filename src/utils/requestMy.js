import axios from 'axios'
import qs from 'qs'

// 创建 axios 实例
const service = axios.create({
  // baseURL: 'http://localhost:8080/CSMS', // api 的 base_url
  baseURL: 'http://139.224.239.13:8080/CSMS_war', // api 的 base_url
  // baseURL: '/api', // api 的 base_url
  timeout: 10000, // 请求超时时间
  transformRequest: [function(data) {
    // 对 data 进行任意转换处理
    return qs.stringify(data)
  }]
})

export default service
