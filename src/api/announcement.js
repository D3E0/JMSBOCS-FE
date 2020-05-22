import request from '@/utils/request'
import store from '@/store'

export function announcementList() {
    return request({
        url: '/api/course/announcements',
        method: 'get',
        params: {
            userId: store.getters.id
        }
    })
}

export function courceAnnouncement(courseId) {
    return request({
        url: '/api/course/announcementList',
        method: 'get',
        params: {
            courseId: courseId
        }
    })
}

export function deleteCourceAnnouncement(courseId) {
    return request({
        url: '/api/course/announcement',
        method: 'delete',
        params: {
            id: courseId
        }
    })
}

export function addCourceAnnouncement(courseId, title, content) {
    return request({
        url: '/api/course/announcement',
        method: 'post',
        data: {
            courseId, title, content
        }
    })
}
