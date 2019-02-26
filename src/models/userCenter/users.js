import {
  queryAll
} from '../../services/userCenter/users'
import commonHelper from '../../helpers/commonHelper'

export default {
  namespace: 'userCenter/users',

  state: {
    loading: true,
    notSetting: false,
    userList: []
  },

  effects: {
    * fetchAll ({callback}, { call, put }) {
      console.log('users model')
        const response = yield call(queryAll)
        const userList = commonHelper.transferObjectsToSelectOptionsWithoutID(response)
        console.log(userList)
        if(callback){
          callback(userList)
        }

    },

  },

  reducers: {
    save (state, action) {
      return {
        ...state,
        userList: action.payload
      }
    },

    updateLoading (state, action) {
      return {
        ...state,
        loading: action.payload
      }
    },

    updateNotSetting (state, action) {
      return {
        ...state,
        notSetting: action.payload
      }
    }
  }
}