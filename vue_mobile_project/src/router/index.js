import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{ //重定向
      path: '/',
      redirect: '/home'
    },
    { //进来以后先加载下面这个
      path: '/',
      component: () => import('@/views/bottom'),
      children: [{
        path: 'home',
        component: () => import('@/views/home'),
      }]
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    },
  ]
})