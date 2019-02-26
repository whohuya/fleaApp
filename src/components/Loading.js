/**
 * User: Coul Turing
 * Date: 2018/8/15
 * @flow
 */
import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'antd-mobile-rn'

const Loading = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size='large' />
    </View>
  )
}
export default Loading
