//这个是专门用来发送登录请求的api;建议所有发送请求的方法都抽取出来
//1.导入发送请求的request文件
import request from '@/utils/request.js'
//2.封装登录的函数
function userLogin({
    mobile,
    code
}) {
    return request({
        method: 'post',
        url: "v1_0/authorizations",
        data: {
            mobile:mobile,
            code:code
        }
    });
}
//3.暴露接口
export default userLogin