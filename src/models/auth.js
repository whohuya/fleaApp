import { login, logInWithMobilePhoneSmsCode, logout } from '../services/auth'
import authHelper from '../helpers/authHelper'
import { Toast } from 'antd-mobile-rn'
import { NavigationActions } from '../utils'
// import {get as getUserInfo } from './userCenter/userInfo'
import commonHelper from '../helpers/commonHelper'
import { queryAllWithUser } from '../services/userCenter/userInfo'
import storage from '../utils/storage'
import { GET_VERIFICATION_CODE_SUCCESS } from '../constants/strings'

export default {
  namespace: 'auth',

  state: {
    loading: true,
    fetching: false,
    user: null
  },

  effects: {
    * login ({ payload, callback }, { call, put }) {
      try {
        yield put({ type: 'updateState', payload: { fetching: true } })
        const response = yield call(login, payload)
        if (response) {
          yield put({ type: 'updateCurrentUser', payload: response })
        }
        console.log('res')
        console.log(response)
        if (callback) {
          callback(response)
        }
      } catch (error) {
        console.log('login error: ', error)
        return error
      } finally {
        yield put({ type: 'updateState', payload: { fetching: false } })
      }
    },

    * logInWithMobilePhoneSmsCode ({ payload, callback }, { call, put }) {
      try {
        yield put({ type: 'updateState', payload: { fetching: true } })
        const response = yield call(logInWithMobilePhoneSmsCode, payload)

        if (response) {
          yield put({ type: 'updateCurrentUser', payload: response })
        }
        if (callback) {
          callback(response)
        }
      } catch (error) {
        console.log('login error: ', error)
        return error
      } finally {
        yield put({ type: 'updateState', payload: { fetching: false } })
      }
    },

    * logout ({ callback }, { call, put }) {
      try {
        yield put({ type: 'updateState', payload: { fetching: true } })
        yield call(logout)
        yield put({ type: 'updateState', payload: { fetching: false } })
        yield put({ type: 'updateCurrentUser', payload: null })
        // storage.clear()
        yield put({ type: 'updateName', payload: '' })
        if (callback) {
          callback()
        }
      } catch (e) {
        console.log(e)
      } finally {
      }
    }
  },

  reducers: {
    changeAuthStatus (state, { payload }) {
      console.log('payload in changeAuthStatus reducer')
      console.log(payload)
      const [...roles] = payload.roles
      return {
        ...state,
        roles,
        status: payload.status
      }
    },
    updateCurrentUserTeacherRelationProperties (state, { payload }) {
      const { teachers, schools, majorClasses, subjects } = payload

      return {
        ...state,
        teachers: [...teachers],
        schools: [...schools],
        majorClasses: [...majorClasses],
        subjects: [...subjects]
      }
    },
    updateCurrentUserRoles (state, { payload }) {
      const { currentUser } = payload
      const roles = authHelper.getCurrentUserRoles(currentUser)

      return {
        ...state,
        roles: [...roles]
      }
    },
    updateName (state, action) {
      return {
        ...state,
        name: action.payload
      }
    },
    updateCurrentUser (state, action) {
      return { ...state, auth: action.payload }
    },

    updateLoading (state, action) {
      return {
        ...state,
        loading: action.payload
      }
    },

    updateState (state, action) {
      return { ...state, ...action.payload }
    }
  }
}
