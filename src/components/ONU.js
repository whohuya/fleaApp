import React, { PureComponent } from 'react'
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { Camera, Permissions } from 'expo'

import {
  Flex,
  Carousel,
  WhiteSpace,
  WingBlank,Card,
  Grid,
  Button
} from 'antd-mobile-rn'

import { createAction, NavigationActions } from '../utils'
import dateTimeHelper from '../helpers/dateTimeHelper'
import * as colors from '../constants/colors'

const ONU = ({ item, onDetail }) => {
  return (
    <TouchableOpacity onPress={() => onDetail(item)} style={styles.item}>
      <Card>
        <Card.Header
          title={`${item.building}-${item.room}`}
          extra={item.sn}
        />
        <Card.Body>
            <Text style={{ marginLeft: 16 }}>{item.description}</Text>
        </Card.Body>
        <Card.Footer
          content={dateTimeHelper.getDateTimeString(item.createdAt)}
          extra=""
        />
      </Card>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
  },
  name: {
    fontSize: 14,
    margin: 8,
    color: colors.grey900
  },
  price: {
    color: colors.red500,
    marginLeft: 8,
    fontSize: 16
  },
  marketPrice: {
    color: colors.grey500,
    fontSize: 13,
    textDecorationLine: 'line-through'
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    backgroundColor: colors.grey100
  },

  card: {
    flexGrow: 1
  }
})

export default ONU
