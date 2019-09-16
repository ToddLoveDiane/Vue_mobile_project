//专门用来处理channel数据的请求
import request from '@/utils/request'

function userchannel() {
    return request({
        url: 'v1_0/user/channels',
        method: "GET"
    })
}
export {
    userchannel
}