/**
 * User: Coul Turing
 * Date: 2018/11/18
 * @flow
 */
import React, { PureComponent } from 'react'
import {
  View,
  Text,
  FlatList,
  NetInfo,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import publicIP from 'react-native-public-ip'

import { connect } from 'react-redux'
import {
  WhiteSpace,
  SearchBar,
  Button,
  List,
  Toast,
  Modal
} from 'antd-mobile-rn'

import * as colors from '../../constants/colors'
import { initialPadding } from '../../constants/numbers'
import findHelper from '../../helpers/findHelper'
import { netTypes } from '../../constants/optionsValues'
import Loading from '../../components/Loading'

const Item = List.Item
@connect(state => ({}))
export default class NetTest extends PureComponent {
  static navigationOptions = {
    title: '网络检测'
  }

  state = {
    loading: true,
    publicIpAddress: '',
    effectiveType: '',
    type: ''
  }

  componentDidMount () {
    this.netTest()
  }

  async componentWillUnmount () {
    await this.onClear()
  }

  netTest = async () => {
    await this.onClear()
    try {
      const publicIpAddress = await publicIP()
      const connectionInfo = await NetInfo.getConnectionInfo()
      console.log(publicIpAddress)
      this.setState({
        loading: false,
        publicIpAddress,
        effectiveType: connectionInfo.effectiveType,
        type: connectionInfo.type.toLowerCase() || ''
      })
    } catch (error) {
      console.log(error)
      Toast.fail('网络连接错误,请重新获取中...')
    } finally {
    }
  }

  onClear = async () => {
    await this.setState({
      loading: true,
      publicIpAddress: '',
      effectiveType: '',
      type: ''
    })
  }
  render () {
    const { type, loading, effectiveType, publicIpAddress } = this.state
    if (loading) {
      return (
        <View style={styles.container}>
          <Loading />
        </View>
      )
    }
    return (
      <View style={styles.container}>

        <WhiteSpace/>
        <List>
          <Item extra={effectiveType} arrow='empty'>
            有效类型
          </Item>
          <Item extra={type === 'none' ? '' : publicIpAddress} arrow='empty'>
            公网ip
          </Item>
          <Item
            extra={
              (findHelper.getItemByValue(netTypes, type) &&
                findHelper.getItemByValue(netTypes, type).name) ||
              '未知网络类型'
            }
            arrow='empty'
          >
            网络类型
          </Item>
        </List>
        <WhiteSpace/>
        <Button onClick={this.netTest}>
          <Text>重新获取</Text>
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  ONUs: {},
  tabs: {
    flex: 1
  },
  footerText: {
    textAlign: 'center',
    padding: initialPadding,
    color: colors.grey600
  }
})
