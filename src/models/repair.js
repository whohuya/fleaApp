import { queryAll, get, change, add, cancel } from '../services/repair/task'
import commonHelper from '../helpers/commonHelper'

export default {
  namespace: 'repair',

  state: {
    repairList: [],
    loading: true
  },

  effects: {
    * add({payload,callback},{call}){

      const response=yield call(add,payload)
        callback(response)
    }
    ,
    * queryFirst ({callback}, {call, put}) {

      const response = yield call(queryAll)
      const repair = commonHelper.parseObjectArrayToObjectArray(response)
      const repairList = repair.map((item, index) => {
        return {
          ...item,
          from: commonHelper.parseObjectToObject(item.from),
          to: commonHelper.parseObjectToObject(item.to),
        }
      })

      if (callback) {
        callback(repairList)
      }
      yield put({
        type: 'save',
        payload: repairList
      })
    },
    * changeState ({payload}, {call}) {
      const response=yield call(change,payload)
      return response
    },
    *delete({payload,callback},{call}){

      const response=yield call(cancel,payload.id)
       if(response) {
         callback(res)
       }
    },
    * get ({payload, callback}, {call}) {

      const response = yield call(get, payload)
      const repair = commonHelper.parseObjectToObject(response)
      const repairItem = {
        ...repair,
        from: commonHelper.parseObjectToObject(repair.from),
        to: commonHelper.parseObjectToObject(repair.to)
      }

      if (callback) {
        callback(repairItem)
      }
    }
  },

  reducers: {
    save (state, action) {
      return {
        ...state,
        repairList: action.payload
      }
    }
  }
}
