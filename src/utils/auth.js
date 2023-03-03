import { localStorageUtils } from './localstorage'

const USER_KEY = 'fish_info'

const userUtils = {
  setUserLocal (userInfo) {
    if (userInfo) {
      localStorageUtils.set(USER_KEY, JSON.stringify(userInfo))
    }
  },
  getUserLocal () {
    const strUserInfo = localStorageUtils.get(USER_KEY)
    if (strUserInfo) {
      return JSON.parse(strUserInfo)
    }
    return null
  },
  getClientInfo () {
    const userInfo = this.getUserLocal()
    if (!userInfo) {
      return null
    }
    const tokenExpireTime = userInfo.tokenExpireTime
    const curTime = new Date().getTime()
    if (curTime > tokenExpireTime) {
      return null
    }
    return userInfo.clientInfo
  },
  getToken () {
    const userInfo = this.getUserLocal()
    if (!userInfo) {
      return null
    }
    const token = userInfo.token
    // const tokenExpireTime = userInfo.tokenExpireTime
    // const curTime = new Date().getTime()
    // if (curTime > tokenExpireTime) {
    //   return ''
    // }
    return token
  },
  removeUserLocal () {
    localStorageUtils.remove(USER_KEY)
  }
}

const loginUtils = {
  ssoLogin (state) {
    let targetUrl = process.env.VUE_APP_CIAM_URL + '/authorize'
    let paramStr = '?'
    const params = {
      response_type: 'code',
      scope: 'openid profile offline_access phone',
      client_id: process.env.VUE_APP_CIAM_CLIENT_ID,
      redirect_uri: process.env.VUE_APP_EXTRA_SITE + '/v2/sso/login',
      state: state,
      nonce: new Date().getTime(),
      culture: 'zh-CN'
    }
    let flag = false
    for (const p in params) {
      if (p && params[p] !== '') {
        if (!flag) {
          paramStr = paramStr + p + '=' + params[p]
          flag = true
        } else {
          if (p && params[p] !== '') {
            paramStr = paramStr + '&' + p + '=' + params[p]
          }
        }
      }
    }
    console.log(targetUrl + paramStr)
    window.location.href = targetUrl + paramStr
  },
  ssoLogout (token) {
    let targetUrl = process.env.VUE_APP_CIAM_URL + '/endsession'
    let paramStr = '?'
    const params = {
      id_token_hint: token,
      post_logout_redirect_uri: process.env.VUE_APP_EXTRA_SITE + '/v2/sso/logout'
    }
    let flag = false
    for (const p in params) {
      if (p && params[p] !== '') {
        if (!flag) {
          paramStr = paramStr + p + '=' + params[p]
          flag = true
        } else {
          if (p && params[p] !== '') {
            paramStr = paramStr + '&' + p + '=' + params[p]
          }
        }
      }
    }
    window.location.href = targetUrl + paramStr
  }
}

export { userUtils, loginUtils }
