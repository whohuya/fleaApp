/**
 * User: Coul Turing
 * Date: 2018/9/6
 * @flow
 */
import React from 'react'
import {View} from 'react-native'
import { Icon } from 'expo'

const LeftIcon =(props)=>{
  const {name,size,color}=props
  return  <View style={{width:22,height:22,marginRight:15,justifyContent: 'center',alignItems: 'center' }}><Icon.Ionicons name={name} size={size} color={color}/>
  </View>
}
export default LeftIcon