import request from '@/utils/request'
//获取文章评论
function getComment({
    type,
    source,
    offset,
    limit
}) {
    return request({
        url: 'v1_0/comments',
        method: 'GET',
        params: {
            type,
            source,
            offset: offset || null,
            limit: limit || null,
        }
    })
}
//发送评论
function sendComment({
    target,
    content,
}) {
    return request({
        url: 'v1_0/comments',
        method: 'POST',
        data: {
            target,
            content,
        }
    })
}
export {
    getComment,
    sendComment
}