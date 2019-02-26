/**
 * User: Coul Turing
 * Date: 2018/7/31
 * @flow
 */

import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native'
import { WhiteSpace } from 'antd-mobile-rn'

import { initialPadding } from '../constants/numbers'
import * as colors from '../constants/colors'
import findHelper from '../helpers/findHelper'
import { orderStatus } from '../constants/optionsValues'
import { ORDER_CANCELED } from '../constants/strings'

const OrderItem = props => {
  const { order, onDetail } = props
  return (
    <TouchableOpacity style={styles.order} onPress={() => onDetail(order)}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          订单编号：
          {order.id}
        </Text>
        {/* <Text style={styles.status}>{findHelper.getItemByValue(orderStatus, order.status).name}</Text> */}
      </View>

      <View style={styles.product}>
        <Image
          style={styles.image}
          source={{ uri: order.products[0].thumbnail }}
        />
        <View style={styles.detail}>
          <Text>
            {order.products[0].name.slice(0, 18)}{' '}
            {order.products[0].name.length > 14 && '...'}{' '}
            {order.products.length > 1 && '等'}
          </Text>
          <View style={styles.info}>
            <View>
              <WhiteSpace size={'sm'} />
              <Text>共 {order.count} 件商品</Text>
              <WhiteSpace size={'sm'} />
              <Text>
                总价：￥
                {order.total}
              </Text>
            </View>
            {order.status === 'isPaid' &&
              !order.canceled && (
              <TouchableOpacity style={styles.pay}>
                <Text style={styles.payText}>去付款</Text>
              </TouchableOpacity>
            )}
            {order.canceled && (
              <View style={styles.pay}>
                <Text style={styles.payText}>{ORDER_CANCELED}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  order: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: initialPadding,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey300
  },
  headerText: {
    fontSize: 14
  },
  status: {
    fontSize: 14,
    color: colors.redA700
  },
  product: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: initialPadding
  },
  image: {
    width: 64,
    height: 64,
    backgroundColor: colors.grey100
  },
  detail: {
    flex: 1,
    marginLeft: initialPadding
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  pay: {
    marginTop: initialPadding,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
  },
  payText: {
    margin: 0,
    padding: 0,
    fontSize: 14,
    color:colors.tianyi
  }
})

export default OrderItem
