import {add} from '../../services/userCenter/feedback'
import { getCurrentUser } from '../../services/auth'

export default {
  namespace: 'userCenter/feedback',
  state: {},
  effects: {
    * add ({ payload, callback }, { call }) {
      console.log(payload)
      const response = yield call(add, {
        feedback: payload.feedback,
        user: getCurrentUser()
      })
      if (callback) {
        callback(response)
      }
    }
  },

  reducers: {}
}
