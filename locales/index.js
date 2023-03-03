import Vue from 'vue' // 引入vue实例
import VueI18n from 'vue-i18n' // 引入vue-i18n多语言包

import ElementUILocale from 'element-ui/lib/locale'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import jaLocale from 'element-ui/lib/locale/lang/ja'

Vue.use(VueI18n) // vue使用vue-i18n

// let DEFAULT_LANG = 'en' // 默认语言为英文
let DEFAULT_LANG // 默认语言为英文

var jsSrc = (navigator.language || navigator.browserLanguage).toLowerCase()
console.log(jsSrc)

if (!sessionStorage.getItem('defaultLang')) {
  if (jsSrc.indexOf('zh') !== -1) {
    DEFAULT_LANG = 'zh'
    window.sessionStorage.setItem('languageType', 'zh-cn')
  } else if (jsSrc.indexOf('ja') !== -1) {
    DEFAULT_LANG = 'ja'
    window.sessionStorage.setItem('languageType', 'ja-jp')
  } else {
    DEFAULT_LANG = 'en'
    window.sessionStorage.setItem('languageType', 'en-sg')
  }
}

const LOCALE_KEY = 'defaultLang' // localStorage来存放的key，名字随便定，接下来会用到。

const locales = { // 引入zh.json以及en.json
  zh: require('./zh-cn.json'),
  en: require('./en-sg.json'),
  ja: require('./ja-jp.json')
}

const UIlocales = {
  zh: zhLocale,
  en: enLocale,
  ja: jaLocale
}

const setUIlocales = lang => {
  switch (lang) {
    case 'zh': return UIlocales.zh
    case 'en': return UIlocales.en
    case 'ja': return UIlocales.ja
  }
}

const i18n = new VueI18n({ // 创建带有选项的 VueI18n 实例
  locale: DEFAULT_LANG, // 语言标识，在这里默认为en,即为英文
  messages: locales // 语言包，上边创建的json文件
})

export const setup = (lang, reset) => { // 切换语言的函数，lang为语言标识，en或者zh
  // 在此判断lang的值，如果未定义，则让lang默认为DEFAULT_LANG，目的是为了让用户在未选择语言的时候默认为英文。
  if (lang === undefined) {
    lang = window.sessionStorage.getItem(LOCALE_KEY)
    if (locales[lang] === undefined) {
      lang = DEFAULT_LANG
    }
  }
  lang = lang.split('-')[0] || lang
  // 若lang有值，那么存入localStorage中，key为LOCALE_KEY,value为lang。
  window.sessionStorage.setItem(LOCALE_KEY, lang)
  Object.keys(locales).forEach(item => {
    document.body.classList.remove(`lang-${item}`)
  })
  document.body.classList.add(`lang-${lang}`)
  document.body.setAttribute('lang', lang)

  Vue.config.lang = lang
  i18n.locale = lang
  sessionStorage.setItem('finalLang', lang)
  ElementUILocale.use(setUIlocales(lang))
  if (reset) {
    location.reload() // 为了重新实例化vue-router对象，避免一些bug
  }
}

export const setLanguage = (lang)=>{
  i18n.locale = lang || 'zh'
} 
setup()
export default i18n
