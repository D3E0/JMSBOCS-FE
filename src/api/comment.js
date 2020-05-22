import request from '@/utils/request'
import store from '@/store'

export function commentList(courseId) {
    return request({
        url: '/api/course/comment',
        method: 'get',
        params: {
            courseId
        }
    })
}

export function addComment(content, userId, courseId, rootId, replyId) {
    return request({
        url: '/api/course/comment',
        method: 'post',
        data: {
            content, userId, courseId, rootId, replyId
        }
    })
}
