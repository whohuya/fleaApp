/**
 * User: Coul Turing
 * Date: 2018/8/16
 * @flow
 */
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FORGET_PASSWORD, SIGN_UP } from '../constants/strings'
import { Button } from 'antd-mobile-rn'
import { initialPadding } from '../constants/numbers'
import * as colors from '../constants/colors'
const LoginFooter = props => {
  const { onSignUp, onResetPassword } = props
  return (
    <View style={styles.footBar}>
      <Button size='small' onClick={onSignUp}>
        <Text style={styles.footerText}>{SIGN_UP}</Text>
      </Button>
      <Button size='small' onClick={onResetPassword}>
        <Text style={styles.footerText}>{FORGET_PASSWORD}</Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  footBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor:'#fff',
    padding: initialPadding
  },
  footerText: {
    fontWeight: 'bold',
    color: colors.tianyi
  }
})

export default LoginFooter
