import parseHelper from '../../helpers/parseHelper'
import { Parse, Promise } from '../../utils/leancloud'
import { getCurrentUser } from '../auth'

const ParsePlace = 'Stars'

export async function queryAllWithUser (payload) {
  return parseHelper.queryAllWithUser(payload, ParsePlace)
}

export async function add (payload) {
  const parseObject = Parse.Object.createWithoutData(
    payload.product.class,
    payload.product.id
  )
  return parseHelper.add(
    { type: payload.type, user: payload.user, product: parseObject },
    ParsePlace
  )
}

export async function find (payload) {
  const { name,className, id } = payload
  const parseObject = Parse.Object.createWithoutData(className, id)
  const queryUser = new Parse.Query(ParsePlace)
  queryUser.equalTo('user', getCurrentUser())

  const queryStatus = new Parse.Query(ParsePlace)
  queryStatus.equalTo(name, parseObject)

  const query = Parse.Query.and(queryStatus, queryUser)

  try {
    const starList = await query.find()
    return starList.length>0 ?{ id:starList[0].id}:{}
  } catch (e) {
    return Promise.reject(e)
  }
}

export async function remove (payload) {
  return parseHelper.remove(payload, ParsePlace)
}
