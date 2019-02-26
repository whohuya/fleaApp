import { search, query, get, add, remove } from '../services/ONU'
import commonHelper from '../helpers/commonHelper'

export default {
  namespace: 'ONU',

  state: {
    ONUList: [],
    loading: true,
    fetching: false
  },

  effects: {
    * fetch ({ payload, callback }, { call, put }) {
      try {
        yield put({ type: 'updateFetching', payload: true })
        const response = yield call(query, payload)
        const ONUList = {
          ...response,
          ONUList: commonHelper.parseObjectArrayToObjectArray(response.ONUList)
        }
        if (callback) {
          callback(ONUList)
        }
      } catch (error) {
      } finally {
        yield put({ type: 'updateFetching', payload: false })
      }
    },

    * get ({ payload, callback }, { call, put }) {
      try {
        const response = yield call(get, payload)
        const ONU = commonHelper.parseObjectToObject(response)
        const ONUItem = {
          ...ONU,
          creator: commonHelper.parseObjectToObject(ONU.creator) || null
        }

        if (callback) {
          callback(ONUItem)
        }
      } catch (error) {
        console.log(error)
      } finally {
      }
    },

    * add ({ payload, callback }, { call, put }) {
      try {
        yield put({ type: 'updateFetching', payload: true })
        const response = yield call(add, payload)
        if (callback) {
          callback(response)
        }
      } catch (error) {
        console.log(error)
      } finally {
        yield put({ type: 'updateFetching', payload: false })
      }
    },

    * delete ({ payload, callback }, { call, put }) {
      const response = yield call(remove, payload)
      if (callback) {
        callback()
      }
    },
    * search ({ payload, callback }, { call, put }) {
      const response = yield call(search, payload)
      const ONUList = commonHelper.parseObjectArrayToObjectArray(response)
      if (callback) {
        callback(ONUList)
      }
    }
  },

  reducers: {
    updateFetching (state, action) {
      return {
        ...state,
        fetching: action.payload
      }
    },
    saveAll (state, action) {
      return {
        ...state,
        placeList: [...action.payload]
      }
    },

    create (state, action) {
      return {
        ...state,
        placeList: [...state.placeList, action.payload]
      }
    },

    update (state, action) {
      return {
        ...state,
        placeList: [
          ...state.placeList.filter(place => place.id !== action.payload.id),
          action.payload
        ]
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
