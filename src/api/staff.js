import request from '@/utils/request'

export function getStaffList(keyword, pageNum, pageSize) {
  return request({
    url: '/user/findAllUserByKeywordAndType',
    method: 'post',
    data: {
      keyword, pageNum, pageSize,
      type: "STAFF"
    }
  })
}

export function getStaffCount(keyword) {
  return request({
    url: '/user/countAllUserByKeywordAndType',
    method: 'post',
    data: {
      keyword,
      type: "STAFF"
    }
  })
}

export function deleteStaff(uid) {
  return request({
    url: '/user/deleteStaff',
    method: 'post',
    data: {uid}
  })
}

export function addStaff(name, password, username) {
  return request({
    url: '/user/addNewStaff',
    method: 'post',
    data: {
      name, password, username,
      type: 'STAFF'
    }
  })
}

export function updateStaff(name, password, username, uid) {
  return request({
    url: '/user/updateUser',
    method: 'post',
    data: {
      password, uid, username, name
    }
  })
}


