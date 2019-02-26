import React, { PureComponent } from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
  DeviceEventEmitter,
  StyleSheet,
  Text,
  Image,
  Linking
} from 'react-native'
import { Grid, Toast, Button, WhiteSpace } from 'antd-mobile-rn'
import { initialPadding } from '../../constants/numbers'
import * as colors from '../../constants/colors'
import { Icon } from 'expo'
import { NavigationActions } from '../../utils'
import { LOGIN, NET_ERROR, NOT_SETTING } from '../../constants/strings'
import netHelper from '../../helpers/netHelper'
import connect from 'react-redux/es/connect/connect'
import { getCurrentUserAsync } from '../../services/auth'
import UserCenterHeader from '../../components/UserCenterHeader'
import commonHelper from '../../helpers/commonHelper'
// TODO: getCurrentUser 有待优化
@connect(state => ({
  basic: state['basic'].basic,
  userCenterMenus:state['menu'].menuList.userCenterMenus
}))

export default class UserCenter extends PureComponent {
  static navigationOptions = {
    title: '个人中心',
    headerTitle: '个人中心',
    tabBarLabel: '个人中心',
    tabBarIcon: ({ focused, tintColor }) => (
      <Icon.Ionicons
        name='ios-person'
        size={28}
        color={focused ? tintColor : colors.borderBase}
      />
    ),
    headerRight: <Icon.Ionicons name='ios-person' size={32} color={'grey'} />
  }

  state = {
    userInfo: null
  }
  componentDidMount () {
    this.loadUserInfo()
    this.listener = DeviceEventEmitter.addListener('loadUserInfo', e => {
      this.loadUserInfo()
    })

    // const userInfo = null
    // this.setState({ userInfo })
    // const { userInfo, dispatch } = this.props
    // if (!userInfo.id) {
    //   dispatch({
    //     type: 'userCenter/userInfo/get'
    //   })
    // }
  }

  componentWillUnmount () {
    this.listener.remove()
  }

  loadUserInfo = () => {
    getCurrentUserAsync().then(currentUser => {
      currentUser
        ? this.setState({
          userInfo: commonHelper.parseObjectToObject(currentUser)
        })
        : this.setState({ userInfo: null })
    })
  }
  onDetail = item => {
    const logined = true
    if (logined) {
      item.linking
        ? netHelper.useCellular(() => {
          Linking.openURL(item.url).catch(err => Toast.offline(NET_ERROR, 1))
        })
        : item.webBrowser
          ? this.props.dispatch(
            NavigationActions.navigate({
              routeName: 'WebBrowser',
              params: { url: item.url }
            })
          )
          : this.props.dispatch(
            NavigationActions.navigate({
              routeName: item.routeName
            })
          )
    }
  }

  onLogin = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Login',
        params: { from: 'UserCenter' }
      })
    )
  }

  onClick = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'UserInfo'
      })
    )
  }

  render () {
    const { userInfo } = this.state
    const { basic,userCenterMenus } = this.props

    return (
      <ScrollView style={styles.container}>
        <UserCenterHeader
          userInfo={userInfo}
          onClick={this.onClick}
          onLogin={this.onLogin}
        />

        <Grid
          columnNum={3}
          data={commonHelper.parseMenuIcon(userCenterMenus)}
          onClick={item => this.onDetail(item)}
          hasLine
        />
      </ScrollView>
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
    backgroundColor: colors.cyan500,
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
  }
})
