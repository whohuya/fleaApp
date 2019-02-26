import { queryAllWithUser,find } from '../../services/userCenter/coupons'
import { getCurrentUser } from '../../services/auth'
import commonHelper from '../../helpers/commonHelper'

export default {
  namespace: 'userCenter/coupons',

  state: {},

  effects: {
    * fetchAll ({ payload, callback }, { call }) {
      const response = yield call(queryAllWithUser, {
        user: getCurrentUser()
      })
      if (callback) {
        callback(commonHelper.parseObjectArrayToObjectArray(response))
      }
    },

    * find ({ payload, callback }, { call }) {
      const response = yield call(find, {
        ...payload,user: getCurrentUser()
      })
      if (callback) {
        callback(commonHelper.parseObjectArrayToObjectArray(response))
      }
    }

  },

  reducers: {}
}
