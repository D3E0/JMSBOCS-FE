import request from '@/utils/request'
import store from '@/store'
import axios from 'axios'
import {getToken} from "@/utils/auth";

export function previewLink(dir, filename) {
    return request({
        url: '/api/file/preview/v2',
        method: 'get',
        params: {
            dir, filename
        }
    })
}

export function downloadLink(dir, filename) {
    return request({
        url: '/api/file/download/v2',
        method: 'get',
        params: {
            dir, filename
        }
    })
}

export function downloadDirLink(parentDir, dir) {
    return request({
        url: '/api/file/download/dir/v2',
        method: 'get',
        params: {
            parentDir, dir
        }
    })
}

export function uploadFile(submitFile, path) {
    let x = getToken();
    let formData = new FormData();
    formData.append('submitFile', submitFile)
    formData.append('path', path)
    return axios.post('/api/file/upload/v2', formData, {
        headers: {'X-Token': x, "content-type": "multipart/form-data"}
    });
}


