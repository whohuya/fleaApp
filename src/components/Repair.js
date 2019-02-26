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
  WingBlank, Card,
  Grid,
  Button,
} from 'antd-mobile-rn'

import { createAction, NavigationActions } from '../utils'
import dateTimeHelper from '../helpers/dateTimeHelper'
import commonHelper from '../helpers/commonHelper'
import { stateList,levelList } from '../constants/optionsValues'
import * as colors from '../constants/colors'
import { parseJSON } from '../utils/url'

const Repair = ({item, onDetail}) => {
  return (
    <TouchableOpacity onPress={() => onDetail(item)} style={styles.item}>
      <Card>
        <Card.Body>
          <View style={styles.title}>
            <Text style={styles.titleItem}>{item.title}</Text>
            <Text style={[{
              backgroundColor: colors[commonHelper.transferLevelValueToColor(item.level,levelList)],

            },styles.stateButton]}>{commonHelper.transferStateValueToLabel(item.state, stateList)}</Text>
          </View>
          <View>
            <Text style={{
              marginLeft: 12,
              fontSize: 16,
              marginTop: 8,
              color: colors.grey400
            }}>{item.from ? item.from.name : '已删除用户'}委派至{item.to ? item.to.name : '已删除用户'}</Text>
          </View>
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
  item: {},
  title: {
    flexDirection: 'row',
    paddingLeft: 12,
    paddingRight: 12,
    justifyContent: 'space-between'
  },
  titleItem: {
    fontSize: 16,
  },
  titleExtra: {
    textAlign: 'right',
    borderWidth: 1,
    padding: 4,
    fontSize: 12,
    borderRadius: 10,
  },
  stateButton: {
    textAlign: 'right',
    padding: 4,
    fontSize: 12,
    overflow: 'hidden',
    color: colors.white,
    borderRadius: 10,
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

export default Repair

