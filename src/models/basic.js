/**
 * User: Coul Turing
 * Date: 2018/8/25
 * @flow
 */
import { queryFirst } from '../services/basic'
import commonHelper from '../helpers/commonHelper'

export default {
  namespace: 'basic',

  state: {
    basic: {},
    loading: true
  },

  effects: {
    * queryFirst ({ payload, callback }, { call, put }) {
      const response = yield call(queryFirst, payload)
      if (response.id) {
        yield put({
          type: 'save',
          payload: commonHelper.parseObjectToObject(response)
        })
      }
    }
  },

  reducers: {
    save (state, action) {
      return {
        ...state,
        basic: action.payload
      }
    }
  }
}
