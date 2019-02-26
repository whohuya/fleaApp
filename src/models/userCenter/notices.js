/**
 * User: Coul Turing
 * Date: 2018/9/4
 * @flow
 */
import { query, queryInProgress } from '../../services/userCenter/notices'
import commonHelper from '../../helpers/commonHelper'
import findHelper from '../../helpers/findHelper'

export default {
  namespace: 'userCenter/notices',

  state: {
    noticeLog: [],
    loading: true
  },

  effects: {
    * query ({ payload, callback }, { call, put }) {
      const response = yield call(query, payload)
      console.log('query res')
      console.log(response)
      if (callback) {
        callback({
          count: response.count,
          current: response.current,
          pageSize: response.pageSize,
          noticeList: commonHelper.parseObjectArrayToObjectArray(
            response.noticeList
          )
        })
      }
    },
    * isReadNotice ({ payload, callback }, { call, put }) {
      yield put({ type: 'readNotice', payload: payload })
    },
    * queryInProgress ({ payload, callback }, { call, put }) {
      console.log('start query')
      const response = yield call(queryInProgress, payload)
      console.log('query res')
      console.log(response)
      yield put({
        type: 'saveInProgress',
        payload: commonHelper.parseObjectArrayToObjectArray(response)
      })
    }
  },

  reducers: {
    saveInProgress (state, action) {
      const serviceNoticeList = action.payload
      const noticeLog = state.noticeLog

      // 查找在本地记录是否由云端的notice，没有的话则删除该记录，有的话保留
      noticeLog.filter(logItem => {
        const noticeItem = findHelper.getItemById(serviceNoticeList, logItem.id)
        return !!noticeItem
      })

      // 云端记录map，若有本地记录，换成本地记录，否则返回格式化云端记录后
      const newNoticeLog = serviceNoticeList.map(item => {
        const serviceNoticeItem = findHelper.getItemById(noticeLog, item.id)
        return serviceNoticeItem || { ...item, isRead: false }
      })

      console.log(newNoticeLog)
      return {
        ...state,
        noticeLog: newNoticeLog
      }
    },
    readNotice (state, action) {
      console.log(action.payload)
      console.log( state.noticeLog.map(item => {
        return item.id === action.payload.id ? { ...item, isRead: true } : item
      }))
      return {
        ...state,
        noticeLog: state.noticeLog.map(item => {
          return item.id === action.payload.id ? { ...item, isRead: true } : item
        })
      }
    }
  }
}
