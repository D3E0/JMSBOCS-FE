import request from '@/utils/request'
import store from '@/store'
import axios from "axios";
import {getToken} from "@/utils/auth";

export function notifyList(page, limit) {
    return request({
        url: '/api/course/notify',
        method: 'get',
        params: {
            userId: store.getters.id, page, limit
        }
    })
}

export function deleteNotify(idList) {
    let x = getToken();
    return axios.post('/api/course/notify/delete', idList, {
        headers: {'X-Token': x}
    });
}
