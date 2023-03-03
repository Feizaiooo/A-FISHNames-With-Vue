import axios from 'axios'
import router from '../router'
import {userUtils}from './auth'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_API_SERVER, // api 的 base_url
  timeout: 1000 * 60 * 5, // request timeout
  withCredentials: true
})
console.log(process.env.VUE_APP_ENV,process.env.NODE_ENV)
// request interceptor
service.interceptors.request.use(
  config => {
    // const whiteList = ['/auth/token/refresh', '/auth/login']
    // let needRefresh = true
    // for (let i = 0; i < whiteList.length; i++) {
    //   if (config.url.indexOf(whiteList[i]) >= 0) {
    //     needRefresh = false
    //     break
    //   }
    // }
 
    var token = userUtils.getToken() || ''
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log(error)
    if (error.response) {
      if (error.response.status === 500) {
        console.log('接口请求异常')
      } else if (error.response.status === 401) {
         // Notify('登录过期')
         userUtils.removeUserLocal()
         setTimeout(() => {
           router.push({
             name: 'login',
             params: {
               redirectUrl: 'index'
             }
           })
         }, 1000)
      } else {
        console.log('接口请求异常')
      }
    } else {
      console.log('接口请求异常')
    }
    return Promise.reject(error)
  }
)

export default service
