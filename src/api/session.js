import request from '@/utils/request'

export function getSessionList(keyword, pageNum, pageSize) {
  return request({
    url: '/conversation/findConversationByKeyword\n',
    method: 'post',
    data: {
      keyword, pageNum, pageSize,
    }
  })
}

export function getSessionCount(keyword) {
  return request({
    url: '/conversation/countConversation',
    method: 'post',
    data: {
      keyword,
    }
  })
}

export function deleteSession(uid) {
  return request({
    url: '/user/deleteSession',
    method: 'post',
    data: {uid}
  })
}

export function getMessage(sid) {
  return request({
    url: '/message/findChatRecordNoPage',
    method: 'post',
    data: {
      cid: sid
    }
  })
}


