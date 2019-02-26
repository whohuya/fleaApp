/**
 * User: Coul Turing
 * Date: 2018/12/20
 * @flow
 */
import {
  getCurrentUserAsync,
} from '../auth'
import { Parse, Promise } from '../../utils/leancloud'

const ParseReply = 'Reply'

export async function add (payload) {
  // 注意，新增reply需要payload中包含taskId
  // 要求数据格式：



  // state : 0: 无法完成   1： 进行中  2  ： 未完成  3 ： 已完成
  // level: 0: 不重要  1: 一般  2： 重要  3： 极其重要

  const demoValue={
    taskId:'',
    content:'',
    state:0 || 1|| 2|| 3  ,
  }

  const task=Parse.Object.createWithoutData('Task', payload.taskId)
  const currentUser = await getCurrentUserAsync()

  const ParseObject = Parse.Object.extend(ParseReply)
  const parseObject = new ParseObject()
  const acl = new Parse.ACL()

  let replyInfo = {
    ...payload,
    executor: currentUser,
    task:task
  }
  delete replyInfo.taskId

  acl.setPublicReadAccess(true)
  acl.setWriteAccess(currentUser, true)
  acl.setRoleWriteAccess('Admin', true)

  parseObject.set(replyInfo)
  parseObject.setACL(acl)
  try {
    return parseObject.save().then(item => {
      return item
    })
  } catch (e) {
    return Promise.reject(e)
  }
}

export async function find (payload){


  const demoValue={
    taskId:'task id'
  }

  const query = new Parse.Query(ParseReply)
  const task=Parse.Object.createWithoutData('Task', payload.taskId)

  query.equalTo('task', task)
  query.descending('createdAt')

  try {
    const replyList = await query.find()
    console.log(replyList)
    return replyList
  } catch (e) {
    return Promise.reject(e)
  }
}
