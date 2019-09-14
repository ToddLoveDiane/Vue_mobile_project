import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//使用vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
//修改默认的语言
import zh_CN from 'vee-validate/dist/locale/zh_CN';
//使用validate
import VeeValidate, { Validator } from 'vee-validate';
// 禁用校验事件
Vue.use(VeeValidate, {
  events: "" 
});
//修改
Validator.localize('zh_CN', zh_CN);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')