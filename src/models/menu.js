import { queryFirst } from '../services/menu'
import commonHelper from '../helpers/commonHelper'
import { homeMenus, userCenterMenus } from '../constants/optionsValues'
export default {
  namespace: 'menu',

  state: {
    menuList: {
      homeMenus: homeMenus,
      userCenterMenus: userCenterMenus
    },
    loading: true
  },

  effects: {
    * queryFirst ({ payload, callback }, { call, put }) {
      const response = yield call(queryFirst, payload)
      console.log(response)
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
        menuList: action.payload
      }
    }
  }
}
