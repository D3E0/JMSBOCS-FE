import request from '@/utils/request'
import store from '@/store'

export function danmakuList(id) {
    return request({
        url: "api/course/danmaku",
        method: 'get',
        params: {
            id
        }
    })
}

export function sendDanmaku(data) {
    return request({
        url: "api/course/danmaku",
        method: 'post',
        data: data
    })
}
