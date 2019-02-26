import {
  queryAllWithUser,
  find,
  add,
  remove
} from '../../services/userCenter/stars'
import { getCurrentUser } from '../../services/auth'
import commonHelper from '../../helpers/commonHelper'

export default {
  namespace: 'userCenter/stars',

  state: {},

  effects: {
    * fetchAll ({ payload, callback }, { call }) {
      const response = yield call(queryAllWithUser, {
        ...payload,
        user: getCurrentUser()
      })
      const starList = commonHelper
        .parseObjectArrayToObjectArray(response)
        .map(star => {
          return {
            ...star,
            product: star.product.id
              ? commonHelper.parseObjectToObject(star.product)
              : undefined
          }
        })
      if (callback) {
        callback(starList)
      }
    },

    * isStar ({payload, callback }, { call }) {
      const response = yield call(find, payload)
      if (callback) {
        callback(response)
      }
    },

    * add ({ payload, callback }, { call }) {
        const response = yield call(add, {
          ...payload,
          user: getCurrentUser()
        })
      if (callback) {
          callback(response)
        }
    },

    * delete ({ payload, callback }, { call, put }) {
      const response = yield call(remove, payload)
      if (callback) {
        callback(response)
      }
    }
  },

  reducers: {}
}
