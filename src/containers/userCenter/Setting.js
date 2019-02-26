/**
 * User: Coul Turing
 * Date: 2018/8/5
 * @flow
 */
import React, { PureComponent } from 'react'
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Linking,
  DeviceEventEmitter
} from 'react-native'
import { connect } from 'react-redux'
import { Grid, List, WhiteSpace, Button, Modal } from 'antd-mobile-rn'
import {
  getCurrentUser,
  getCurrentUserAsync,
  getCurrentUserToObject
} from '../../services/auth'
import * as strings from '../../constants/strings'
import { initialPadding } from '../../constants/numbers'
import * as colors from '../../constants/colors'
import { LOGOUT } from '../../constants/strings'

import { Icon } from 'expo'
import { createAction, NavigationActions } from '../../utils'
import LeftIcon from '../../components/LeftIcon'

const Item = List.Item
const Brifef = Item.Brief

@connect(state => ({}))
export default class Setting extends PureComponent {
  static navigationOptions = {
    title: '设置',
    headerTitle: '设置'
  }

  state = {
    logined: false,
    userInfo: null
  }

  async componentDidMount () {
    const userInfo = await getCurrentUserAsync()
    this.setState({ logined: !!userInfo, userInfo })
  }

  onLogout = () => {
    this.props.dispatch({
      type: 'auth/logout',
      callback: () => {
        DeviceEventEmitter.emit('loadUserInfo', 'renew')
        this.props.navigation.goBack()
      }
    })
  }

  onDetail = (router, params) => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: router,
        params: params || undefined
      })
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <WhiteSpace />
          <List>
            <Item
              thumb={<LeftIcon name={'ios-keypad'} size={26} color={colors.green400}/>}
              arrow='horizontal'
              onClick={() => {
                this.onDetail('Version')
              }}
            >
             版本信息
            </Item>

          </List>
        </ScrollView>
        <TouchableOpacity style={styles.logout} onPress={this.onLogout}>
          <Text style={styles.logoutText}>{LOGOUT}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey100,
    flex: 1
  },
  profileInfo: {
    flex: 1,
    height: 140,
    backgroundColor: colors.grey300,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  avatar: {
    margin: initialPadding,
    height: 72,
    width: 72,
    borderRadius: 36
  },
  info: {
    flex: 1
  },
  name: {
    fontSize: 18,
    color: '#fff'
  },
  logout: {
    height: 47,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.tianyi
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15
  },
  modalTitle: {
    lineHeight: 30
  },
  modalContent: {
    lineHeight: 20
  }
})



