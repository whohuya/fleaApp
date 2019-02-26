/**
 * User: Coul Turing
 * Date: 2018/12/17
 * @flow
 */
import React, { PureComponent } from 'react'

import { View, Text, StyleSheet, TouchableOpacity, Clipboard,Linking } from 'react-native'
import { Camera, Permissions } from 'expo'
import { connect } from 'react-redux'
import { Modal } from 'antd-mobile-rn'


import * as colors from '../../constants/colors'

import { initialPadding } from '../../constants/numbers'

import CameraToolBar from '../../components/CameraToolBar'
import { NavigationActions } from 'react-navigation'


@connect(state => ({}))
export default class ONUList extends PureComponent {
  static navigationOptions = {
    title: '二维码识别'
  }

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    code: '',
    onLight:false
  }

  async componentDidMount () {
    await this.onCameraPermission()
  }

  onCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermission: status === 'granted'
    })
  }

  handleBarCodeRead = data => {
    const code = data.data
    this.setState({ code })
    Modal.alert(code,'', [
      {
        text: '访问',
        onPress: () => {
          Linking.openURL(code).catch(err => console.error('An error occurred', err));
        }
      },
      {
        text: '复制',
        onPress: () => {
          Clipboard.setString(code)
        }
      },
      {
        text: '关闭',
        onPress: () => {}
      }
    ])
  }

  changeCamera = () => {
    this.setState({
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    })
  }


  changeLight=()=>{
    this.setState({ onLight: !this.state.onLight })
  }




  render () {
    const { hasCameraPermission,onLight } = this.state
    if (hasCameraPermission === null) {
      return <View />
    }
    else if (hasCameraPermission === false) {
      return <Text>暂无权限</Text>
    }
    else {
      return (
        <View style={{ flex: 1 ,}}>
          <Camera
            flashMode={onLight ? 'torch' : 'off'}
            style={{ flex: 1,flexDirection: 'column-reverse' }}
            type={this.state.type}
            onBarCodeScanned={this.handleBarCodeRead}
          >
            <CameraToolBar changeCamera={this.changeCamera} changeLight={this.changeLight}/>
          </Camera>

        </View>
      )
    }
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
