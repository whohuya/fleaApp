import { Icon } from 'expo'
import * as colors from '../constants/colors'
import React from 'react'

/**
 * Created by zhaoyu on Oct 11, 2017.
 * @flow
 */

export default class commonHelper {

  static parseMenuIcon (objects) {
    return objects.map(object => {
      return {
        ...object,
        icon: <Icon.Ionicons name={object.iconName || 'ios-qr-scanner'} size={object.iconSize || 32}
          color={colors[object.iconColor] || colors.tianyi} />
      }
    })
  }

  static transferObjectsToSelectOptionsWithoutID (objects) {
    if (!objects) {
      return []
    }
    return objects.map(object =>
      Object.assign(
        {},
        {
          key: object.id,
          value: object.id,
          label: `${object.attributes.fullName || object.attributes.name}`
        }
      )
    )
  }

  static transferObjectsToSelectOptions (objects) {
    if (!objects) {
      return []
    }
    return objects.map(object =>
      Object.assign({}, object, {
        key: object.id,
        value: object.id,
        label: `${object.name || object.title}(${object.id})`
      })
    )
  }

  static transferUsersToOptionsWithUsername (users) {
    if (!users) {
      return []
    }
    return users.map(user =>
      Object.assign(
        {},
        {
          key: user.id,
          value: `${user.attributes.username}`,
          label: `${user.attributes.username}`
        }
      )
    )
  }

  static transferObjectsToFilterOptions (objects) {
    if (!objects) {
      return []
    }
    return objects.map(object =>
      Object.assign(
        {},
        {
          text: object.attributes.fullName || object.attributes.name || '',
          value: object.id || object.value
        }
      )
    )
  }

  static transferStateValueToLabel (value, options) {

    const option=options.length>0&&options.find(option=>option.value===value)
    return option?option.label:' '
  }
  static transferLevelValueToColor (value, options) {

    const option=options.length>0&&options.find(option=>option.value===value)
    return option?option.color:'grey'
  }
  static transferLevelValueToLabel (value, options) {

    const option=options.length>0&&options.find(option=>option.value===value)
    return option?option.label:' '
  }

  static displayOptionValue (value, options) {
    const option =
      options.length > 0 && options.find(option => option['value'] === value)
    return option ? option['label'] : ''
  }

  static sortBySerial (a, b) {
    if (a && a.serial && b && b.serial) {
      return a.serial - b.serial
    }
    return 0
  }

  static parseObjectToObject (parseObject) {
    if (!parseObject) {
      return null
    }
    const {id, createdAt, updatedAt} = parseObject
    const obj = {id, createdAt, updatedAt, key: id}
    Object.keys(parseObject.attributes).forEach(
      attribute => (obj[attribute] = parseObject.get(attribute))
    )
    return obj
  }

  static parseObjectArrayToObjectArray (parseObjectArray) {
    if (!parseObjectArray) {
      return []
    }
    const objectArray = []
    parseObjectArray.forEach(parseObject => {
      objectArray.push(this.parseObjectToObject(parseObject))
    })
    return objectArray
  }

  static parseProductToProductInfo (product, amount) {
    return {
      type: 'product',
      id: product.id,
      name: product.name,
      price: product.price,
      marketPrice: product.marketPrice,
      amount: amount,
      thumbnail: product.thumbnail,
      checked: false
    }
  }
}
