import parseHelper from '../../helpers/parseHelper'
import { Parse, Promise } from '../../utils/leancloud'
import { defaultPageSize, maxPageSize } from '../../constants/numbers'
import { getCurrentUser } from '../auth'
// import request from '../utils/url'

const ParseNotice = 'Notice'

export async function query (payload) {
  const { page } = payload
  // handle pagination
  const pageSize =  defaultPageSize
  const current = page || 1

  const  query = new Parse.Query(ParseNotice)
  query.equalTo('display',true);

  const count=await query.count()
  query.limit(pageSize)
  query.skip((current - 1) * pageSize)

  // handle sorter
  query.descending('createdAt');

  try {
    const noticeList = await query.find()
    return { noticeList,current,pageSize, count}
  } catch (e) {
    // console.error('shits happened during parse fetchAll: ', e)
    return Promise.reject(e)
  }

}

export async function queryInProgress (payload) {
  // TODO: 查询开始时间小于当前时间、结束时间大于当前时间的公告、开放的公告。
  console.log('start  service ')
  const includes = payload.includes ? payload.includes : []

  const queryStartTime = new Parse.Query(ParseNotice)
  queryStartTime.lessThanOrEqualTo('startDateTime', new Date())

  const queryEndTime = new Parse.Query(ParseNotice)
  queryEndTime.greaterThanOrEqualTo('endDateTime', new Date())

  const queryDisplay = new Parse.Query(ParseNotice)
  queryDisplay.equalTo('display', true)


  const query = Parse.Query.and(queryStartTime, queryEndTime,queryDisplay)
  // handle sorter
  query.ascending('serial')

  if (includes.length > 0) {
    for (let i = 0; i < originObject.includes.length; i++) {
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
