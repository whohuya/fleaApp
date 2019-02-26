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
import { ORDER_CANCELED } from '../constants/strings'

const NoticeItem = props => {
  const { notice, onDetail } = props
  return (
    <TouchableOpacity style={styles.notice} onPress={() => onDetail(notice)}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{notice.title}</Text>
      </View>
      {notice.content && (
        <View style={styles.product}>
          <Text>{notice.content}</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  notice: {
    flex: 1,
    padding: initialPadding,
    backgroundColor: '#fff'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: initialPadding
  },
  headerText: {
    fontSize: 14
  },
  product: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: initialPadding
  },
})

export default NoticeItem
