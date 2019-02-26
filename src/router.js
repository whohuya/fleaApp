import React, { PureComponent } from 'react'
import { BackHandler, Animated, Easing, Text } from 'react-native'
import {
  createStackNavigator,
  NavigationActions,
  StackNavigator,
  TabNavigator,
  TabBarBottom,
  addNavigationHelpers
} from 'react-navigation'
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'

import { Icon } from 'expo'
import * as colors from './constants/colors'
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer
} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'

import Loading from './components/Loading'
import Login from './containers/Login'
import Home from './containers/Home'
import Detail from './containers/Detail'

import ONUAdd from './containers/ONU/ONUAdd'
import ONUList from './containers/ONU/ONUList'
import ONUSearch from './containers/ONU/ONUSearch'
import ONUDetail from './containers/ONU/ONUDetial'


import Version from './containers/userCenter/Version'
import QRCode from './containers/tools/QRCode'
import Repair from './containers/tools/Repair'
import RepairDetail from './containers/tools/RepairDetail'
import RepairAdd from './containers/tools/RepairAdd'
import ReplyAdd from './containers/tools/ReplyAdd'

import NetTest from './containers/net/NetTest'
// userCenter
import UserCenter from './containers/userCenter/UserCenter'
import Setting from './containers/userCenter/Setting'

import WebBrowser from './containers/WebBrowser'

import { headerTitles } from './constants/optionsValues'
import findHelper from './helpers/findHelper'
const HomeNavigator = createBottomTabNavigator(
  {
    Home: { screen: Home },
    UserCenter: { screen: UserCenter }
  },
  {
    swipeEnabled: false,
    animationEnabled: false,
    lazyLoad: true,
    tabBarOptions: {
      activeTintColor: colors.tianyi, // 文字和图片选中颜色
      inactiveTintColor: colors.borderBase, // 文字和图片未选中颜色
      labelStyle: {
        fontSize: 12,
        fontWeight: 'bold'
      }
    }
  }
)

HomeNavigator.navigationOptions = props => {
  const { navigation } = props
  const { routeName } = navigation.state.routes[navigation.state.index]

  // You can do whatever you like here to pick the title based on the route name

  const headerTitle = findHelper.getItemByName(headerTitles, routeName)

  return {
    headerTitle: headerTitle ? headerTitle.value : routeName,
    title: 'test'
  }
}

const MainNavigator = createStackNavigator(
  {
    HomeNavigator: { screen: HomeNavigator },

    Setting: { screen: Setting },
    QRCode: {screen: QRCode},
    Repair:{screen:Repair},
    RepairDetail:{screen:RepairDetail},
    RepairAdd:{screen:RepairAdd},
    ReplyAdd:{screen:ReplyAdd},

    ONUAdd: { screen: ONUAdd },
    ONUList: { screen: ONUList },
    ONUSearch: { screen: ONUSearch },
    ONUDetail: { screen: ONUDetail },

    NetTest: { screen: NetTest},
    Version: { screen: Version},

    WebBrowser: { screen: WebBrowser }
  },
  {
    navigationOptions: {
      headerTintColor: '#fff',
      // headerTintColor: colors.tianyi,
      headerStyle: {
        backgroundColor: colors.tianyi
      }
    },
    headerMode: 'float'
  }
)

const AppNavigator = createStackNavigator(
  {
    Main: { screen: MainNavigator },
    Login: { screen: Login }
  },
  {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps
        const { index } = scene

        const height = layout.initHeight
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0]
        })

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1]
        })

        return { opacity, transform: [{ translateY }] }
      }
    })
  }
)

export const routerReducer = createNavigationReducer(AppNavigator)

export const routerMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.router
)

const App = reduxifyNavigator(AppNavigator, 'root')

function getActiveRouteName (navigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getActiveRouteName(route)
  }
  return route.routeName
}

@connect(({ app, router }) => ({ app, router }))
class Router extends PureComponent {
  componentWillMount () {
    BackHandler.addEventListener('hardwareBackPress', this.backHandle)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
  }

  backHandle = () => {
    const currentScreen = getActiveRouteName(this.props.router)
    if (currentScreen === 'Login') {
      return true
    }
    if (currentScreen !== 'Home') {
      this.props.dispatch(NavigationActions.back())
      return true
    }
    return false
  }

  render () {
    const { app, dispatch, router } = this.props
    if (app.loading) return <Loading />

    return <App dispatch={dispatch} state={router} />
  }
}

export default Router
