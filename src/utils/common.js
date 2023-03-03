import CryptoJS from 'crypto-js'
import Vue from 'vue'

const commonUtils = {
 
  parseTime (time, cFormat) {
    if (arguments.length === 0) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if (('' + time).length === 10) time = parseInt(time) * 1000
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return timeStr
  },
  convertBase64ToFile (base64Data, fileName) {
    const arr = base64Data.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], fileName, { type: mime, lastModified: Date.now() })
  },

}

const cryptoUtils = {
  getEncKey () {
    return CryptoJS.enc.Utf8.parse(CryptoJS.MD5('bosch-extra-aes').toString().substr(0, 16))
  },
  getEncIv () {
    return CryptoJS.enc.Utf8.parse(CryptoJS.MD5(this.getEncKey()).toString().substr(0, 16))
  },
  AESEncrypt (srcStr) {
    let encrypted = CryptoJS.AES.encrypt(srcStr, this.getEncKey(), {
      iv: this.getEncIv(),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    })
    return encrypted.toString()
  },
  AESDecrypt (message) {
    let decrypted = CryptoJS.AES.decrypt(message, this.getEncKey(), {
      iv: this.getEncIv(),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    })
    return decrypted.toString(CryptoJS.enc.Utf8)
  }
}
export { commonUtils, cryptoUtils }
