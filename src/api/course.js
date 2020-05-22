import request from '@/utils/request'
import store from '@/store'
import axios from 'axios'
import {getToken} from "@/utils/auth";

export function teacherInfo(courseId) {
    return request({
        url: '/api/course/teacher',
        method: 'get',
        params: {
            courseId
        }
    })
}

export function courseList() {
    return request({
        url: '/api/course/list',
        method: 'get',
        params: {
            userId: store.getters.id
        }
    })
}

export function courseInfo(id) {
    return request({
        url: '/api/course/info',
        method: 'get',
        params: {
            id
        }
    })
}

export function deleteCourse(courseId) {
    return request({
        url: '/api/course/delete',
        method: 'delete',
        params: {
            courseId
        }
    })
}

export function addCourse(name, description, id, scope, logo, path, courseId) {
    return request({
        url: '/api/course/add',
        method: 'post',
        data: {
            name, description, id, scope, logo, path, courseId
        }
    })
}

export function courseStudent(courseId) {
    return request({
        url: '/api/course/student',
        method: 'get',
        params: {
            courseId
        }
    })
}

export function addCourseStudent(courseId, studentList) {
    let x = getToken();
    return axios.post('/api/course/student', {courseId, studentList}, {
        headers: {'X-Token': x}
    });
}


export function deleteCourseStudent(courseId, studentList) {
    let x = getToken();
    return axios.post('/api/course/student/delete', {courseId, studentList}, {
        headers: {'X-Token': x}
    });
}

export function recommend() {
    return request({
        url: '/api/course/recommend',
        method: 'get',
        params: {
            userId: store.getters.id
        }
    })
}


export function favor(courseId) {
    return request({
        url: '/api/course/favor',
        method: 'post',
        data: {
            courseId, userId: store.getters.id
        }
    })
}

export function favorList() {
    return request({
        url: '/api/course/favor/list',
        method: 'get',
        params: {
            userId: store.getters.id
        }
    })
}

export function unfavor(courseId) {
    return request({
        url: '/api/course/favor',
        method: 'delete',
        params: {
            courseId, userId: store.getters.id
        }
    })
}

export function studyInfo(courseId, status) {
    return request({
        url: '/api/course/study',
        method: 'get',
        params: {
            courseId, userId: store.getters.id, status
        }
    })
}

export function allCoursee(department, major, keyword, page, limit) {
    return request({
        url: '/api/course/courses',
        method: 'get',
        params: {
            userId: store.getters.id, department, major, keyword, page, limit
        }
    })
}



