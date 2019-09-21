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
    { //进来后先加载/bottom,后加载它的子组件
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
    {
      name:'search',
      path:'/search',
      component:()=>import('@/views/search')
    },
    {
      name:'arlist',
      path:'/arlist/:key',
      component:()=>import('@/views/arlist')
    },
    {
      name:'detail',
      path:'/detail/:art_id',
      component:()=>import('@/views/detail')
    },
  ]
})