import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import ElementUI from 'element-ui';
import './element-variables.scss';
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'
import '@/assets/css/boschsans.css'
import '@/assets/fonts/splatoon.css'
import 'babel-polyfill';
import './assets/css/tailwindcss.css';
import './assets/css/main.scss'
import popup from '@/components/dialog'   //找到文件地址
Vue.prototype.$popup = popup ;
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({     
    easing: 'ease',  // 动画方式    
    speed: 500,  // 递增进度条的速度    
    showSpinner: false, // 是否显示加载ico    
    trickleSpeed: 200, // 自动递增间隔    
    minimum: 0.3 // 初始化时的最小百分比
})
// import * as echarts from 'echarts';
// import VueQuillEditor from 'vue-quill-editor'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
import * as filters from './utils/filter'
import store from './store/index' 
import axios from 'axios'
// import Moment from 'moment'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n);
import i18n from '../locales'
import swmmingFish from './components/index'
Vue.use(swmmingFish)
// Vue.prototype.$moment = Moment;
// Vue.prototype.$echarts = echarts;

// Vue.filter('formatDateTime', function(value) {
//     return Moment(value).format('YYYY-MM-DD HH:mm:ss')
// })
// Vue.filter('formatDate', function(value) {
//     return Moment(value).format('YYYY-MM-DD')
// })

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
// Vue.use(VueQuillEditor)
Vue.use(ElementUI, {
    size: 'small'
});
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
