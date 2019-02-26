import { find,add} from '../services/repair/reply'
import commonHelper from '../helpers/commonHelper'

export default {
  namespace: 'reply',

  state: {
    repairList: [],
    loading: true
  },

  effects: {
    * add ({payload, callback}, {call}) {
      console.log('moodel add')
      console.log(payload)
      const response = yield call(add, payload)
      callback(response)
    },
    *find({payload,callback},{call}){
      const response=yield call(find,payload)
      const reply = commonHelper.parseObjectArrayToObjectArray(response)
      // const replyList = reply.map((item, index) => {
      //   return {
      //     ...item,
      //     from: commonHelper.parseObjectToObject(item.from),
      //     to: commonHelper.parseObjectToObject(item.to),
      //   }
      // })
      callback(reply)
    },
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
