import Vue from 'vue'
import Vuex from 'vuex'
import base from './modules/base'
import language from './modules/language'
import fish from './modules/fish'
import report from './modules/report'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    base,
    language,
    fish,
    report
  },
})

export default store
