import parseHelper from '../../helpers/parseHelper'
import { Parse, Promise } from '../../utils/leancloud'
import { defaultPageSize, maxPageSize } from '../../constants/numbers'
import { getCurrentUser } from '../auth'

const ParsePlace = 'Coupon'

export async function queryAllWithUser (payload) {
  const includes = payload.includes ? payload.includes : []

  const queryUser = new Parse.Query(ParsePlace)
  queryUser.equalTo('user', payload.user)

  const queryUsed = new Parse.Query(ParsePlace)
  queryUsed.notEqualTo('used', true)

  const query = Parse.Query.and(queryUser, queryUsed)

  query.limit(maxPageSize)
  if (includes.length > 0) {
    for (let i = 0; i < payload.includes.length; i++) {
      query.include(includes[i])
    }
  }

  try {
    const list = await query.find()
    return Promise.resolve(list)
  } catch (e) {
    // console.error('shits happened during parse fetchAll: ', e)
    return Promise.reject(e)
  }
}

export async function find (payload) {
  const { name,value} = payload

  const  queryUser = new Parse.Query(ParsePlace)
  queryUser.equalTo('user',getCurrentUser());

  const  queryStatus = new Parse.Query(ParsePlace)
  queryStatus.equalTo(name, value);

  const  query = Parse.Query.and(queryStatus, queryUser);

  try {
    const couponList = await query.find()
    return  couponList
  } catch (e) {
    // console.error('shits happened during parse fetchAll: ', e)
    return Promise.reject(e)
  }


}
