import {  queryFirst } from '../services/basic'
import commonHelper from '../helpers/commonHelper'

export default {
  namespace: 'basic',

  state: {
    basic:{},
    loading: true,
  },

  effects: {
    * queryFirst ({}, { call, put }) {
      try {
        yield put({ type: 'updateLoading', payload: true })
        const response = yield call(queryFirst)
        yield put({ type: 'save', payload: commonHelper.parseObjectToObject(response) })
      } catch (error) {
      } finally {
        yield put({ type: 'updateLoading', payload: false })
      }
    }
  },

  reducers: {
    save (state, action) {
      return {
        ...state,
        basic: action.payload
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
