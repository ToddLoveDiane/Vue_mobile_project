import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//使用vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
//使用validate
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')