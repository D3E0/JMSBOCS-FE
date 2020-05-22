import request from '@/utils/request'
import store from '@/store'

export function resourceList(courseId) {
    return request({
        url: '/api/course/resourceList',
        method: 'get',
        params: {
            courseId
        }
    })
}

export function resource(id) {
    return request({
        url: '/api/course/resource',
        method: 'get',
        params: {
            id
        }
    })
}

export function deleteResource(id) {
    return request({
        url: '/api/course/resource',
        method: 'delete',
        params: {
            id
        }
    })
}

export function addResource(courseId, filename, path) {
    return request({
        url: '/api/course/resource/add',
        method: 'post',
        data: {
            courseId, filename, path
        }
    })
}
