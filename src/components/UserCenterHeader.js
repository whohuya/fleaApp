/**
 * User: Coul Turing
 * Date: 2018/10/29
 * @flow
 */
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import defaultUser from '../images/defaultUser.jpg'
import { LOGIN, NOT_SETTING } from '../constants/strings'
import { NavigationActions } from 'react-navigation'
import * as colors from '../constants/colors'
import { initialPadding } from '../constants/numbers'

const UserCenterHeader =(props)=>{
  const { userInfo ,onClick,onLogin} = props
  if (!userInfo) {
    return (
      <TouchableOpacity style={styles.profileInfo} onPress={onLogin}>
        <Image style={styles.avatar} source={defaultUser} />
        <View style={styles.info}>
          <Text style={styles.name}>{LOGIN} </Text>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <TouchableOpacity
      style={styles.profileInfo}
      onPress={onClick}
    >
      <Image
        style={styles.avatar}
        source={userInfo.avatar ? { uri: userInfo.avatar } : defaultUser}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{userInfo.name || NOT_SETTING} </Text>
      </View>
    </TouchableOpacity>
  )

}


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey100,
    flex: 1
  },
  profileInfo: {
    flex: 1,
    height: 140,
    backgroundColor: colors.tianyi,
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


export default UserCenterHeader