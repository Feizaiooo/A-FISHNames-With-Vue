import request from '@/utils/request'
const baseApi = {
  login: (data) => {
    return request({
      url: '/auth/login',
      method: 'post',
      data
    })
  },
  getfishList: params => {
    return request({
      url: '/fish/list',
      method: 'get',
      params
    })
  },
  queryFish: params => {
    return request({
      url: '/fish/query',
      method: 'get',
      params
    })
  },
  randomImage: params => {
    return request({
      url: '/fish/randomImage',
      method: 'get',
      params
    })
  },
  addFish: (data) => {
    return request({
      url: '/fish/addFish',
      method: 'post',
      data
    })
  },
}
export default baseApi
