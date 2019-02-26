/**
 * @flow
 */
import { Parse, Promise } from '../utils/leancloud'
import { defaultPageSize, maxPageSize } from '../constants/numbers'
import { getCurrentUser } from '../services/auth'

export default class ParseHelper {
  static standardQuery (
    parseObjectName,
    params,
    sortField= '',
    searchFieldName= ''
  ) {
    const query = new Parse.Query(parseObjectName)

    // handle pagination
    const pageSize = params.pageSize || defaultPageSize
    const current = params.page || 1
    query.limit(pageSize)
    query.skip((current - 1) * pageSize)

    // handle sorter
    if (params.sorter && params.sorter.order) {
      if (params.sorter.order === 'ascend') {
        query.addAscending(params.sorter.field)
      } else {
        query.addDescending(params.sorter.field)
      }
    } else if (sortField) {
      query.ascending(sortField)
    }

    // handle search
    if (params.search && params.search.length > 0 && searchFieldName !== '') {
      query.contains(searchFieldName, params.search)
    }

    // console.warn('query in query:', query, params)
    return { query, current, pageSize }
  }

  static async queryAll (
    originObject= {},
    parseObjectName,
    sortField= 'serial'
  ) {
    const query = new Parse.Query(parseObjectName)
    // handle pagination
    query.limit(maxPageSize)
    // sort by serial
    query.ascending(sortField)

    try {
      const list = await query.find()
      return Promise.resolve(list)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  static async queryFirst (originObject = {}, parseObjectName) {
    const query = new Parse.Query(parseObjectName)
    const includes = originObject.includes ? originObject.includes : []
    if (originObject.name) {
      query.equalTo(originObject.name, originObject.value)
    }
    if (includes.length > 0) {
      for (let i = 0; i < originObject.includes.length; i++) {
        query.include(includes[i])
      }
    }
    // sort by serial

    try {
      const item = await query.first()
      return Promise.resolve(item)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  static async queryAllWithUser (
    originObject,
    parseObjectName,
    sortField = 'serial'
  ) {
    const includes = originObject.includes ? originObject.includes : []
    const query = new Parse.Query(parseObjectName)
    query.equalTo('user', originObject.user)
    query.limit(maxPageSize)
    if (includes.length > 0) {
      for (let i = 0; i < originObject.includes.length; i++) {
        query.include(includes[i])
      }
    }

    // sort by serial
    query.ascending(sortField)

    try {
      const list = await query.find()
      return Promise.resolve(list)
    } catch (e) {
      // console.error('shits happened during parse fetchAll: ', e)
      return Promise.reject(e)
    }
  }

  static async add (originObject, parseObjectName) {
    // console.warn('in parse helper add', originObject, parseObjectName)
    const ParseObject = Parse.Object.extend(parseObjectName)
    const parseObject = new ParseObject()
    const acl = new Parse.ACL()
    // console.warn('before for let loop')
    for (let prop in originObject) {
      // console.warn('in for let loop: ', prop)
      if (!originObject.hasOwnProperty(prop)) {
        continue
      }
      parseObject.set(prop, originObject[prop])
    }
    acl.setPublicReadAccess(true)
    acl.setWriteAccess(getCurrentUser(), true)
    acl.setRoleWriteAccess('Admin', true)
    parseObject.setACL(acl)
    // console.warn('in add helper function: ', originObject)
    try {
      return parseObject.save()
    } catch (e) {
      console.error('shits happened during parse add: ', e)
      return Promise.reject(e)
    }
  }

  static async get (originObject, parseObjectName) {
    const query = new Parse.Query(parseObjectName)
    const includes = originObject.includes ? originObject.includes : []
    if (includes.length > 0) {
      for (let i = 0; i < originObject.includes.length; i++) {
        query.include(includes[i])
      }
    }
    try {
      const product = await query.get(originObject.id)
      return Promise.resolve(product)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  static async update (originObject, parseObjectName) {
    const parseObject = Parse.Object.createWithoutData(
      parseObjectName,
      originObject.id
    )
    const acl = new Parse.ACL()
    for (let prop in originObject) {
      if (!originObject.hasOwnProperty(prop) || prop === 'id' || prop === 'createdAt' || prop === 'updatedAt') {
        continue
      }
      parseObject.set(prop, originObject[prop])
    }
    acl.setPublicReadAccess(true)
    acl.setWriteAccess(getCurrentUser(), true)
    acl.setRoleWriteAccess('Admin', true)
    parseObject.setACL(acl)
    // console.warn('in update helper function: ', originObject)
    try {
      return parseObject.save().then(item => {
        return item
      })
    } catch (e) {
      console.error('shits happened during parse update: ', e)
      return Promise.reject(e)
    }
  }

  static async remove (originObject, parseObjectName) {
    const parseObject = Parse.Object.createWithoutData(
      parseObjectName,
      originObject.id
    )
    try {
      return parseObject.destroy()
    } catch (e) {
      // console.error('shits happened during parse destroy: ', e)
      return Promise.reject(e)
    }
  }

  static async select (originObject, parseObjectName) {
    const includes = originObject.includes ? originObject.includes : []
    const query = new Parse.Query(parseObjectName)
    const findObject = Parse.Object.createWithoutData(
      originObject.className,
      originObject.id
    )
    // handle pagination
    query.equalTo(originObject.name, findObject)
    query.limit(maxPageSize)
    if (includes.length > 0) {
      for (let i = 0; i < originObject.includes.length; i++) {
        query.include(includes[i])
      }
    }

    // sort by serial

    try {
      const list = await query.find()
      return Promise.resolve(list)
    } catch (e) {
      // console.error('shits happened during parse fetchAll: ', e)
      return Promise.reject(e)
    }
  }

  static async find (originObject, parseObjectName) {
    const includes = originObject.includes ? originObject.includes : []
    const query = new Parse.Query(parseObjectName)
    query.equalTo(originObject.name, originObject.value)
    query.limit(maxPageSize)
    if (includes.length > 0) {
      for (let i = 0; i < originObject.includes.length; i++) {
        query.include(includes[i])
      }
    }
    try {
      const list = await query.find()
      return Promise.resolve(list)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  static async selectSearch (
    originObject,
    parseObjectName,
    sortField = 'serial'
  ) {
    const searchText = originObject.searchText ? originObject.searchText : []
    const query = new Parse.Query(parseObjectName)
    const findObject = Parse.Object.createWithoutData(
      originObject.className,
      originObject.id
    )
    // handle pagination
    query.equalTo(originObject.name, findObject)
    query.limit(maxPageSize)
    if (searchText.length > 0) {
      for (let i = 0; i < originObject.searchText.length; i++) {
        query.search(searchText[i])
      }
    }

    // sort by serial
    query.ascending(sortField)

    try {
      const list = await query.find()
      return Promise.resolve(list)
    } catch (e) {
      // console.error('shits happened during parse fetchAll: ', e)
      return Promise.reject(e)
    }
  }

  static async search (originObject, parseObjectName) {
    const includes = originObject.includes ? originObject.includes : []
    const query = new Parse.Query(parseObjectName)
    query.contains(originObject.name, originObject.value)
    query.limit(50)
    if (includes.length > 0) {
      for (let i = 0; i < originObject.includes.length; i++) {
        query.include(includes[i])
      }
    }
    query.descending(originObject.sorter)

    try {
      const list = await query.find()
      return Promise.resolve(list)
    } catch (e) {
      // console.error('shits happened during parse fetchAll: ', e)
      return Promise.reject(e)
    }
  }
}
