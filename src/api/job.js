import request from '@/utils/request'
import store from '@/store'

/**
 * 作业列表
 * @param page
 */
export function jobList(keyword, courseId, page, limit) {
    limit = limit ? limit : 100;
    page = page ? page : 1;
    return request({
        url: '/api/course/jobList',
        method: 'get',
        params: {
            userId: store.getters.id, keyword, courseId, page, limit
        }
    })
}

/**
 * 课程作业列表
 * @param page
 */
export function courseJobList(courseId) {
    return request({
        url: '/api/course/jobList/course',
        method: 'get',
        params: {
            courseId
        }
    })
}

/**
 *作业信息
 * @param jobId
 */
export function jobInfo(jobId, userId) {
    return request({
        url: '/api/course/job',
        method: 'get',
        params: {
            jobId, userId
        }
    })
}

/**
 * 添加或更新作业
 * @param jobTitle
 * @param jobContent
 * @param beginTime
 * @param endTime
 * @param courseId
 * @param jobId
 */
export function updateJob(jobTitle, jobContent, beginTime, endTime, courseId, jobId) {
    return request({
        url: '/api/course/job',
        method: 'post',
        data: {
            jobTitle, jobContent, beginTime, endTime, courseId, jobId
        }
    })
}

/**
 * 删除作业
 * @param jobId
 */
export function deleteJob(jobId) {
    return request({
        url: '/api/course/job',
        method: 'delete',
        params: {
            jobId
        }
    })
}

/**
 * 作业提交列表
 * @param jobId
 */
export function jobItemList(jobId) {
    return request({
        url: '/api/course/job/items',
        method: 'get',
        params: {
            jobId
        }
    })
}

/**
 * 删除作业提交记录
 * @param jobItemId
 */
export function deleteJobItem(jobItemId) {
    return request({
        url: '/api/course/job/item/v2',
        method: 'delete',
        params: {
            jobItemId
        }
    })
}

/**
 * 作业提交记录详情
 * @param jobId
 */
export function jobItemInfo(jobId, userId) {
    if (!userId) {
        userId = store.getters.id;
    }
    return request({
        url: '/api/course/job/item',
        method: 'get',
        params: {
            jobId, userId
        }
    })
}

/**
 * 作业提交记录详情
 * @param id
 */
export function jobSubmitItemInfo(id) {
    return request({
        url: '/api/course/job/item/info',
        method: 'get',
        params: {
            id
        }
    })
}

/**
 * 作业提交
 */
export function submitJob(jobId, dir, filename) {
    let userId = store.getters.id;
    return request({
        url: '/api/course/job/submit/v2',
        method: 'post',
        data: {
            jobId, userId, dir, filename,
        }
    })
}

/**
 * 作业提交
 */
export function updateJobItem(id, score) {
    return request({
        url: '/api/course/job/item/update',
        method: 'post',
        data: {
            id, score
        }
    })
}

/**
 * 作业提交
 */
export function fetchJobItem(id, jobId, type) {
    return request({
        url: '/api/course/job/item/page',
        method: 'get',
        params: {
            id, jobId, type
        }
    })
}

/**
 * 作业提交
 */
export function scoreList(keyword, page, limit) {
    let userId = store.getters.id;
    limit = limit ? limit : 100;
    page = page ? page : 1;
    return request({
        url: '/api/course/job/score/list',
        method: 'get',
        params: {
            userId, keyword, page, limit
        }
    })
}
