import {
  queryAllWithUser,
  updateAvatar,
  update
} from '../../services/userCenter/userInfo'
import { getCurrentUser } from '../../services/auth'
import commonHelper from '../../helpers/commonHelper'

export default {
  namespace: 'userCenter/userInfo',

  state: {
    loading: true,
    notSetting: false,
    userInfo: {}
  },

  effects: {
    * get ({ payload }, { call, put }) {
      yield put({ type: 'updateLoading', payload: true })
      const response = yield call(queryAllWithUser, {user: getCurrentUser()})
      if (response.length === 0) {
        yield put({ type: 'updateNotSetting', payload: true })
      } else {
        const userInfo = {
          ...commonHelper.parseObjectToObject(response[0]),
          avatar: response[0].get('avatar')
            ? response[0].get('avatar').get('url')
            : null
        }
        yield put({ type: 'save', payload: userInfo })
      }
      yield put({ type: 'updateLoading', payload: false })
    },

    * update ({ payload, callback }, { call, put }) {
      yield put({ type: 'updateLoading', payload: true })
      const response = yield call(update, {
        ...payload,
        user: getCurrentUser()
      })
      yield put({ type: 'get'})

      yield put({ type: 'updateLoading', payload: false })

      if (callback) {
        callback()
      }
    },

    * updateAvatar ({ payload, callback }, { call, put }) {
      yield put({ type: 'updateLoading', payload: true })
      const response = yield call(updateAvatar, {
        ...payload,
        user: getCurrentUser()
      })
      yield put({
        type: 'saveAvatar',
        payload: response
      })
      yield put({ type: 'updateLoading', payload: false })

      if (callback) {
        callback()
      }
    },

    * clear ({ payload, callback }, { call, put }) {
      yield put({ type: 'delete' })

      if (callback) {
        callback()
      }
    }
  },

  reducers: {
    save (state, action) {
      return {
        ...state,
        userInfo: action.payload
      }
    },
    saveAvatar (state, action) {
      console.log('reducer')
      console.log(state.userInfo)
      console.log({ ...state.userInfo, avatar: action.payload })
      return {
        ...state,
        userInfo: { ...state.userInfo, avatar: action.payload }
      }
    },
    delete (state) {
      return {
        ...state,
        userInfo: {}
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
