import { find } from '../../services/home/trending'
import commonHelper from '../../helpers/commonHelper'

export default {
  namespace: 'home/trending',

  state: {
    trendingList: [],
    loading: true
  },

  effects: {
    * find ({ payload, callback }, { call, put }) {
      const response = yield call(find, payload)
      const newTrending = commonHelper.parseObjectToObject(response[0])
      yield put({ type: 'saveAll', payload: newTrending })
      if (callback) {
        callback(newTrending)
      }
    }
  },

  reducers: {
    saveAll (state, action) {
      return {
        ...state,
        trendingList: [...action.payload]
      }
    }
  }
}
