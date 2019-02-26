/**
 * User: Coul Turing
 * Date: 2018/12/17
 * @flow
 */
import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { WingBlank, WhiteSpace } from 'antd-mobile-rn'
import { Icon } from 'expo'
import * as colors from '../constants/colors'

const CameraToolBar = props => {
  const { changeCamera, changeLight } = props
  return (
    <View
      style={{
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: 60,
        opacity:0.5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}
    >
      <TouchableOpacity onPress={changeLight}>
        <WingBlank size={'lg'}>
          <Icon.Ionicons name='ios-flashlight' size={32} color={'#FAFAFA'} />
        </WingBlank>
      </TouchableOpacity>

      <TouchableOpacity onPress={changeCamera}>
        <WingBlank size={'lg'}>
          <Icon.Ionicons
            name='ios-reverse-camera'
            size={32}
            color={'#FAFAFA'}
          />
        </WingBlank>
      </TouchableOpacity>
    </View>
  )
}

export default CameraToolBar
