import axios from 'axios'
//创建axios实例
let http = axios.create({
  baseURL: 'http://callback.olrando.cn',
  timeout: 10000,
})
//请求拦截器
http.interceptors.request.use((config) => {
  // 设置请求的headers信息
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  return config
})
//响应拦截器
http.interceptors.response.use((response) => {
  return response.data
})
export default http
