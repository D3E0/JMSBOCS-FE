import request from '@/utils/request'
import store from '@/store'
import axios from 'axios'
import {getToken} from "@/utils/auth";

export function chapters(courseId) {
    return request({
        url: '/api/course/chapters',
        method: 'get',
        params: {
            courseId
        }
    })
}

export function addChapter(courseId, parentId, title, level, order, id, type, filePath, filename, content) {
    return request({
        url: '/api/course/chapter',
        method: 'post',
        data: {
            courseId, parentId, title, level, order, id, filePath, filename, type, content
        }
    })
}

export function deleteChapter(id) {
    return request({
        url: '/api/course/chapter',
        method: 'delete',
        params: {
            id
        }
    })
}
