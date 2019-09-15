//axios发送请求的封装
import axios from 'axios'
//设置基地址
const myReq = axios.create({
    baseURL: "http://ttapi.research.itcast.cn/app/"
})
//设置请求拦截器
myReq.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// 设置响应拦截器
myReq.interceptors.response.use(function (response) {
    //这里相当于过滤操作,直接拿其中的数据
    return response.data.data || response.data;
}, function (error) {
    return Promise.reject(error);
});
//暴露接口
export default myReq;