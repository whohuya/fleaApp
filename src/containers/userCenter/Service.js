/**
 * User: Coul Turing
 * Date: 2018/8/2
 * @flow
 */
import React, { PureComponent } from 'react'
import {
  ScrollView,
  StyleSheet,
  Linking,
  View,
} from 'react-native'

import { WhiteSpace } from 'antd-mobile-rn'
import {Icon} from 'expo'

import * as colors from '../../constants/colors'

class Service extends PureComponent {
  static navigationOptions = {
    headerTitle: '联系客服',
    headerBackTitle:'返回',
    headerRight:(  <Icon.Ionicons
      name='ios-person'
      size={32}
      color={'grey'}
    />)
  }

  componentDidMount(){
    const url='http://www.baidu.com'
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }
  render () {
    return (
      <View style={styles.container}>
        <ScrollView
          style={{ flex: 1, backgroundColor: colors.grey200 }}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <WhiteSpace/>

        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    flex: 1,
    backgroundColor: 'white'
  },
})

export default Service
