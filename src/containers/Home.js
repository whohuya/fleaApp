import React, { PureComponent } from 'react'
import { StyleSheet, ScrollView, Text, Share, View } from 'react-native'
import { Icon} from 'expo'
import { Grid, Button, Toast, WhiteSpace } from 'antd-mobile-rn'
import { connect } from 'react-redux'
import * as colors from '../constants/colors'
import { NavigationActions } from '../utils'
import { getCurrentUser, getCurrentUserAsync } from '../services/auth'
import commonHelper from '../helpers/commonHelper'

@connect(state => ({
  homeMenus:state['menu'].menuList.homeMenus
}))
class Home extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '主页',
      headerTitle: 'test',
      tabBarIcon: ({ focused, tintColor }) => (
        <Icon.Ionicons
          name='ios-home'
          size={28}
          color={focused ? tintColor : colors.borderBase}
        />
      )
    }
  }

  componentDidMount () {
    this.loadBasic()
    this.loadMenu()
  }

  loadBasic = () => {
    this.props.dispatch({ type: 'basic/queryFirst' })
  }
  loadMenu = () => {
    this.props.dispatch({ type: 'menu/queryFirst' })
  }

  onDetail = async item => {
    const userInfo = await getCurrentUserAsync()
    if (userInfo) {
      this.props.dispatch(
        NavigationActions.navigate({ routeName: item.routeName })
      )
    } else {
      Toast.fail('未登录!!!')
    }
  }


  render () {
    const {homeMenus} = this.props
    return (
      <View style={styles.container}>
        <ScrollView
          style={{ flex: 1, backgroundColor: colors.grey100 }}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <WhiteSpace />
          <Grid
            columnNum={3}
            data={commonHelper.parseMenuIcon(homeMenus)}
            onClick={item => this.onDetail(item)}
            hasLine={false}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  icon: {
    width: 32,
    height: 32
  }
})

export default Home
