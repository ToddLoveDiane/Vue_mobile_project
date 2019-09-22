import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dayjs from 'dayjs'
//修改默认的语言
import zh_CN from 'vee-validate/dist/locale/zh_CN';
import Vant from 'vant';
import 'dayjs/locale/zh-cn'
import 'vant/lib/index.css';
import {
  Lazyload
} from 'vant';
Vue.use(Vant);
//使用validate
import VeeValidate, {
  Validator
} from 'vee-validate';
// 禁用校验事件
Vue.use(VeeValidate, {
  events: ""
});
//修改
Validator.localize('zh_CN', zh_CN);
//dayjs
dayjs.locale('zh-cn');
Vue.use(Lazyload);

import relativeTime from 'dayjs/plugin/relativeTime'
//定义一个全局的过滤器
Vue.filter('timeformat', value => {
  return dayjs().from(dayjs(value))
})
Vue.filter("dateformat", function (value) {
  return dayjs(value).format('MM-DD HH:mm')
});
//导入我们自己的插件
import myPlugin from '@/utils/gLogin.js'
//use一下
Vue.use(myPlugin)
dayjs.extend(relativeTime)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')