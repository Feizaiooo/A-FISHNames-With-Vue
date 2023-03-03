import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import centerRoutes from './modules/center'
import layoutRoutes from './modules/layout'
import { userUtils } from '../utils/auth'
Vue.use(VueRouter)

const indexRoutes = [
  // {
  //   path: '/',
  //   redirect: '/home'
  // },
  
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/randomIamge',
    name: 'randomIamge',
    component: () => import('@/views/random/random.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
  },
  { path: '*', redirect: '/404'}
]
const routes = indexRoutes
    .concat(layoutRoutes)
    .concat(centerRoutes)
const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.meta.canActivate === 'AuthGuard') {
    let info = userUtils.getUserLocal()
    if (!info) {
      next({
        path: '/login',
        query: { redirectUrl: to.path }
      })
    } else {
      next()
    }
  }
  next()
})


router.afterEach((to, from) => {
  // alert("after each");
  NProgress.done()
})
export default router
