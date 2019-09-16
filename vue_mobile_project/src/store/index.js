import Vue from 'vue'
import Vuex from 'vuex'
//导入所有的author函数
import * as author from '@/utils/author.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //拿到数据
    user: author.getToken()
  },
  mutations: {
    setStore(state, user) {
      //保存用户的数据,存储到Localstorage中
      author.setToken(user);
      //将用户的信息更新
      state.user = user;
    }
  },
  actions: {

  }
})