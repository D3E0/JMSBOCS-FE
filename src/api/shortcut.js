import request from '@/utils/request'

export function getGreetingList(keyword, pageNum, pageSize) {
  return request({
    url: '/greeting/GreetingList',
    method: 'post',
    data: {
      keyword, pageNum, pageSize
    }
  })
}

export function getGreetingCount(keyword) {
  return request({
    url: '/greeting/countGreetings',
    method: 'post',
    data: {
      keyword
    }
  })
}

export function deleteGreeting(gid) {
  return request({
    url: '/greeting/deleteGreeting',
    method: 'post',
    data: {gid}
  })
}

export function addGreeting(content, uid) {
  return request({
    url: '/greeting/addGreeting',
    method: 'post',
    data: {
      'createuser.uid': uid,
      content
    }
  })
}

export function updateGreeting(content, gid) {
  return request({
    url: '/greeting/updateGreeting',
    method: 'post',
    data: {
      content: content,
      gid: gid
    }
  })
}


