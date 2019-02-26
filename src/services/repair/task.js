/**
 * User: Coul Turing
 * Date: 2018/12/20
 * @flow
 */
import parseHelper from '../../helpers/parseHelper'
import {
  getCurrentUser,
  getCurrentUserAsync,
  getCurrentUserRoles
} from '../auth'
import { Parse, Promise } from '../../utils/leancloud'
import { defaultPageSize, maxPageSize } from '../../constants/numbers'
const ParseTask = 'Task'

export async function add (payload) {
  // to 字段为userId
  const demoValue = {
    content: '',
    toId: 'to user id',
    title: '',
    level: 1 || 2 || 3 || 0,
  }

  const to = Parse.Object.createWithoutData('_User', payload.toId)
  const currentUser = await getCurrentUserAsync()
  const ParseObject = Parse.Object.extend(ParseTask)
  const parseObject = new ParseObject()
  const acl = new Parse.ACL()

  let taskInfo = payload
  taskInfo = {
    ...taskInfo,
    from: currentUser,
    creator: currentUser,
    to: to
  }
  delete taskInfo.toId




  parseObject.set(taskInfo)
  acl.setPublicReadAccess(true)
  acl.setWriteAccess(currentUser, true)
  acl.setRoleWriteAccess('Admin', true)
  parseObject.setACL(acl)
  try {
    return parseObject.save().then(item => {
      return item
    })
  } catch (e) {
    return Promise.reject(e)
  }
}

export async function queryAll () {
  const role = await getCurrentUserRoles()
  const currentUser = await getCurrentUserAsync()
  const query = new Parse.Query(ParseTask)

  if (role !== 'Admin') {
    query.equalTo('to', currentUser)
  }
  query.notEqualTo('finished', true)
  query.include('from', 'to')
  query.descending('level')

  try {
    const taskList = await query.find()
   
    return taskList
  } catch (e) {
    return Promise.reject(e)
  }
}
export async function query (payload) {
  const { page, sortField } = payload
  // handle pagination
  const pageSize = defaultPageSize
  const current = page || 1

  const query = new Parse.Query(ParseTask)
  const count = await query.count()
  query.limit(pageSize)
  query.skip((current - 1) * pageSize)

  // handle sorter
  query.addDescending(sortField)

  try {
    const ONUList = await query.find()
    return { ONUList, current, pageSize, count }
  } catch (e) {
    // console.error('shits happened during parse fetchAll: ', e)
    return Promise.reject(e)
  }
}

export async function get (payload) {
  /* payload 中
  {
  includes:['from','to',]

  */

  const demoValue = {
    includes: ['from', 'to'],
    id: 'taskId'
  }
  return parseHelper.get(payload, ParseTask)
}

export async function finish (payload) {
  try {
    await Parse.Cloud.run('finishTask', { taskId: payload })
    return true
  } catch (e) {
    throw e
  }
}
export async function change (payload) {
  const {id}=payload
  try {
    console.log('service change')
   const res= await Parse.Cloud.run('updateTask', { taskId: id })
    console.log(res)
    console.log('end ddd')
    console.warn()
    return  res
  } catch (e) {
    throw e
  }

}
export async function cancel (payload) {
  try {
    await Parse.Cloud.run('cancelTask', { taskId: payload })
    return true
  } catch (e) {
    throw e
  }

  // AV.Cloud.run('cancelTask', { taskId: testId }).then(
  //   function (data) {
  //     if (data) {
  //       wx.navigateBack()
  //     } else {
  //       wx.showToast({ icon: 'none', title: '网络错误' })
  //     }
  //   },
  //   function (err) {
  //     wx.showToast({ icon: 'none', title: '网络错误' })
  //   }
  // )
}
