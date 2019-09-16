//获取文章列表的封装
import request from '@/utils/request'

function getArticle({
    channel_id,
    timestamp,
    with_top
}) {
    return request({
        url: 'v1_1/articles',
        method: 'GET',
        params: {
            channel_id,
            timestamp,
            with_top
        }
    })
}

export {
    getArticle
}