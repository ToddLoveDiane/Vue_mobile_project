import request from '@/utils/request'

//获取文章列表的封装
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
//隐藏文章列表
function hideArticle(artId) {
    return request({
        url: 'v1_0/article/dislikes',
        method: 'POST',
        data: {
            target: artId
        }
    })
}
//完成举报
function reportArticle({
    target,
    type
}) {
    return request({
        url: 'v1_0/article/reports',
        method: 'POST',
        data: {
            target: target,
            type: type,
            remark: 'Valar Moghulis'
        }
    })
}

//拉黑文章
function blackList(autId) {
    return request({
        url:'v1_0/user/blacklists',
        method:'POST',
        data:{
            target:autId
        }
    })
}

//模糊搜索
function likeKeyWord(key){
    return request({
        url:'v1_0/suggestion',
        method:'GET',
        params:{
            q:key
        }
    })
}
//搜索关键字
function searchKey({page,per_page,key}){
return request({
    url:'v1_0/search',
    method:'GET',
    params:{
        page,
        per_page,
        q:key
    }
})
}
export {
    getArticle,
    hideArticle,
    reportArticle,
    blackList,
    likeKeyWord,
    searchKey
}