//对token的封装
//定义键
const valueKey = 'user'
//1.设置token
function setToken(value) {
    return window.localStorage.setItem(valueKey, JSON.stringify(value))
}
//2.获取token
function getToken() {
    window.localStorage.getItem(valueKey) ? JSON.parse(window.localStorage.getItem(valueKey)) : null;
}
//3.清除token
function removeToken(){
     window.localStorage.removeItem(valueKey)
}
//4.暴露所有的接口
export {
    setToken,
    getToken,
    removeToken
}