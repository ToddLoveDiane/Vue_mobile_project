import Vue from 'vue'
// 导入 store
import store from "@/store";
// 导入 dailog 
import {
    Dialog
} from "vant";
// 导入 router
import router from "@/router";

Vue.use(Dialog);
//
let myPlugin = {};
myPlugin.install = function (Vue) {
    // 1. 添加全局方法或属性
    // 4. 添加实例方法
    Vue.prototype.$login = function () {
        let res = store.state.user; //拿到store中state的数据
        if (!res || !res.token) {
            //如果res不存在,取反为true,则要求用户去登录,只有登录了才能评论
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