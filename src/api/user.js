import request from '@/utils/request'
import store from '@/store'
import axios from "axios";
import {getToken} from "@/utils/auth";

export function userInfo(id) {
    return request({
        url: '/api/user/info',
        method: 'get',
        params: {
            id: id || store.getters.id
        }
    })
}

export function updateStudentInfo(phone, email) {
    return request({
        url: '/api/user/stu',
        method: 'post',
        data: {
            id: store.getters.id,
            phone, email
        }
    })
}


export function updateTeacherInfo(phone, email, office) {
    return request({
        url: '/api/user/tch',
        method: 'post',
        data: {
            id: store.getters.id, phone, email, office
        }
    })
}

export function updatePassword(oldPass, newPass, checkPass) {
    return request({
        url: '/api/user/pwd',
        method: 'post',
        data: {
            id: store.getters.id, oldPass, newPass, checkPass
        }
    })
}

export function addTeacher(userId, username) {
    return request({
        url: '/api/user/teacher',
        method: 'post',
        data: {
            userId, username
        }
    })
}


export function category(id) {
    return request({
        url: '/api/user/category',
        method: 'get',
        params: {
            id
        }
    })
}

export function addCategory(department, major, specialty) {
    return request({
        url: '/api/user/category',
        method: 'post',
        data: {
            department, major, specialty
        }
    })
}

export function users() {
    return request({
        url: '/api/user/all',
        method: 'get',
        params: {
            loginName: store.getters.id
        }
    })
}

export function updateStatus(loginName, status) {
    return request({
        url: '/api/user/status',
        method: 'post',
        data: {
            loginName, status
        }
    })
}

export function updateUser(loginName, name, role, department, major, specialty) {
    return request({
        url: '/api/user/update',
        method: 'post',
        data: {
            loginName, name, role, department, major, specialty
        }
    })
}


export function addUserList(userList) {
    let x = getToken();
    return axios.post('/api/user/add', userList, {
        headers: {'X-Token': x}
    });
}
