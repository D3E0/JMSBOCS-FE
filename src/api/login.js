import request from '@/utils/request'

export function login(username, password) {
    return request({
        url: '/api/auth/login',
        method: 'post',
        data: {
            id: username,
            pass: password
        }
    })
}

export function getId() {
    return request({
        url: '/api/auth/token',
        method: 'get',
    })
}

export function logout() {
    return request({
        url: '/api/auth/logout',
        method: 'post'
    })
}
