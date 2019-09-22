//封装用户详情
import request from '@/utils/request.js'
//用户登录
function userLogin({
    mobile,
    code
}) {
    return request({
        method: 'post',
        url: "v1_0/authorizations",
        data: {
            mobile: mobile,
            code: code
        }
    });
}
//关注用户
function getFollow(target) {
    return request({
        url: 'v1_0/user/followings',
        method: 'POST',
        data: {
            target
        }
    })
}
//取消关注
function noFollow(autId) {
    return request({
        url: `v1_0/user/followings/${autId}`,
        method: 'DELETE',
    })
}
//点赞
function thumbsUp(artId) {
    return request({
        url: 'v1_0/article/likings',
        method: 'POST',
        data: {
            target: artId
        }
    })
}
//取消点赞
function thumbsDown(artId) {
    return request({
        url: `v1_0/article/likings/${artId}`,
        method: 'DELETE',
    })
}
//喜欢文章
function iLike(artId){
    return request({
        url: `v1_0/article/dislikes/${artId}`,
        method: 'DELETE',
    })
}
//不喜欢
function iHate(artId){
    return request({
        url: 'v1_0/article/dislikes',
        method: 'POST',
        data: {
            target: artId
        }
    })
}
//3.暴露接口 如果没有写default就用{}对象
export {
    userLogin,
    getFollow,
    noFollow,
    thumbsDown,
    thumbsUp,
    iLike,
    iHate
}