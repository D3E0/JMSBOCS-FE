import request from '@/utils/request'

export function login(username, password) {
    return request({
        url: '/login',
        method: 'post',
        data: {
            id: username,
            pass: password
        }
    })
}

export function getInfo(token) {
    return request({
        url: '/api/user/info',
        method: 'get',
        params: {token}
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}
