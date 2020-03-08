import request from '@/utils/request'

export function getQuestionList(keyword, pageNum, pageSize, classificationId) {
  return request({
    url: '/problem/problemList',
    method: 'post',
    data: {
      keyword, pageNum, pageSize, classificationId
    }
  })
}

export function getQuestionCount(keyword, classificationId) {
  return request({
    url: '/problem/countProblem',
    method: 'post',
    data: {
      keyword, classificationId
    }
  })
}

export function deleteQuestion(pid) {
  return request({
    url: '/problem/deleteProblem',
    method: 'post',
    data: { pid }
  })
}

export function addQuestion(content, answer, cid) {
  return request({
    url: '/problem/addProblem',
    method: 'post',
    data: {
      'classification.cid': cid,
      content,
      'answer.content': answer
    }
  })
}

export function updateQuestion(pid, question, aid, answer, cid) {
  return request({
    url: '/problem/updateProblem',
    method: 'post',
    data: {
      'classification.cid': cid,
      content: question,
      pid: pid,
      'answer.content': answer,
      'answer.aid': aid
    }
  })
}

export function getClassificationList() {
  return request({
    url: '/Classification/findAllClassification',
    method: 'post'
  })
}



