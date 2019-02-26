import { find } from '../../services/home/banner'
import commonHelper from '../../helpers/commonHelper'

export default {
  namespace: 'home/banner',

  state: {
    homeBannerList: [],
    marketBannerList: [],
    bannerList: [],
    loading: true
  },

  effects: {
    * fetchHomeBanner ({ payload, callback }, { call, put }) {
      const response = yield call(find, payload)
      const newBannerList = commonHelper
        .parseObjectArrayToObjectArray(response)
        .map(item => ({
          ...item,
          category: commonHelper.parseObjectToObject(item.category),
          image: commonHelper.parseObjectToObject(item.image)
        }))
      yield put({ type: 'saveHomeBanner', payload: newBannerList })
      if (callback) {
        callback(response)
      }
    },
    * fetchMarketBanner ({ payload, callback }, { call, put }) {
      const response = yield call(find, payload)
      const newBannerList = commonHelper
        .parseObjectArrayToObjectArray(response)
        .map(item => ({
          ...item,
          category: commonHelper.parseObjectToObject(item.category),
          image: commonHelper.parseObjectToObject(item.image)
        }))
      yield put({ type: 'saveMarketBanner', payload: newBannerList })
      if (callback) {
        callback(response)
      }
    }
  },

  reducers: {
    saveHomeBanner (state, action) {
      return {
        ...state,
        homeBannerList: [...action.payload]
      }
    },
    saveMarketBanner (state, action) {
      return {
        ...state,
        marketBannerList: [...action.payload]
      }
    },

    updateLoading (state, action) {
      return {
        ...state,
        loading: action.payload
      }
    }
  }
}
