import parseHelper from '../helpers/parseHelper'
import { getCurrentUser, getCurrentUserAsync } from './auth'
import { Parse, Promise } from '../utils/leancloud'
import { defaultPageSize, maxPageSize } from '../constants/numbers'
const ParsePlace = 'ONU'

export async function queryAllWithUser (payload) {
  return parseHelper.queryAllWithUser(payload, ParsePlace)
}

export async function add (payload) {
  const currentUser = await getCurrentUserAsync()
  let ONUInfo = payload
  ONUInfo = {
    ...ONUInfo,
    creator: currentUser
  }
  const ParseObject = Parse.Object.extend(ParsePlace)
  const parseObject = new ParseObject()
  const acl = new Parse.ACL()

  parseObject.set(ONUInfo)
  acl.setPublicReadAccess(true)
  acl.setRoleWriteAccess('Admin', true)
  parseObject.setACL(acl)
  try {
    return parseObject.save().then(item => {
      return item
    })
  } catch (e) {
    console.error('shits happened during parse update: ', e)
    return Promise.reject(e)
  }
}

export async function remove (payload) {
  return parseHelper.remove(payload, ParsePlace)
}

export async function query (payload) {
  const { page, sortField } = payload
  // handle pagination
  const pageSize = defaultPageSize
  const current = page || 1

  const query = new Parse.Query(ParsePlace)
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
export async function search (payload) {
  const { name, value } = payload
  const query = new Parse.Query(ParsePlace)
  query.contains(name, value)
  query.limit('20')
  try {
    const ONUList = await query.find()
    return ONUList
  } catch (e) {
    // console.error('shits happened during parse fetchAll: ', e)
    return Promise.reject(e)
  }
}

export async function get (payload) {
  return parseHelper.get(payload, ParsePlace)
}
