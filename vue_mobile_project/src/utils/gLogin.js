//封装全局登录的一个插件
import Vue from 'vue'
import {
    Dialog
} from "vant";
import router from "@/router";
import store from "@/store";
Vue.use(Dialog);
//
let myPlugin={};
myPlugin.install = function (Vue) {
    // 1. 添加全局方法或属性
    // 4. 添加实例方法
    Vue.prototype.$gLogin = function () {
        let res = store.state.user; //拿到store中state的数据
        if (!res && !res.token) {
            Dialog.confirm({
                title: '注意',
                message: '登录之后才能评论哦'
            }).then(() => {
                // on confirm
                router.push('/login')
            }).catch(() => {
                // on cancel
                return
            });
        }
    }, error => {
        // Do something with request error
        return Promise.reject(error);
    }
}
export default myPlugin;