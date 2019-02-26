import AV from 'leancloud-storage'

import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Modal } from 'antd-mobile-rn'

// 测试
var APP_ID = 'fAPEDDDmLpiPA8eMsO2MBIen-gzGzoHsz';
var APP_KEY = 'LmihT0atIMBtHmSMhK8Pqxv7';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});


// import Promise
export const Promise = require('bluebird')
export const Parse = AV

// handle parse error messages
// todo: 需要进行错误处理：202-已存在；203-email已存在，214-mobilePhoneNumber已存在
export const handleError = (error)=> {
  try {
    switch (error.code) {
      case 201: {
        // missing password
        return
      }
      case 210: {
        Modal.alert(
          <Text style={styles.modalTitle}>用户名密码错误</Text>,
          <Text style={styles.modalContent}>
            用户名密码错误，如需帮助请联系管理员。
          </Text>,
          [{ text: '确定', onPress: () => console.log('ok') }]
        )
        return
      }
      case 211: {
        Modal.alert(
          <Text style={styles.modalTitle}>用户名不存在</Text>,
          <Text style={styles.modalContent}>
            指定的用户名不存在，请确认后重新输入。
          </Text>,
          [{ text: '确定', onPress: () => console.log('ok') }]
        )
        return
      }
      case 219: {
        // 登录失败次数超过限制
        Modal.alert(
          <Text style={styles.modalTitle}>超过次数限制</Text>,
          <Text style={styles.modalContent}>
            登录失败次数超过限制，请稍候再试，或者通过忘记密码重设密码。
          </Text>,
          [{ text: '确定', onPress: () => console.log('ok') }]
        )
        return
      }
      default:
        Modal.alert(
          <Text style={styles.modalTitle}>发生未知错误</Text>,
          <Text style={styles.modalContent}>请稍后再试。</Text>,
          [{ text: '确定', onPress: () => console.log('ok') }]
        )
    }
  } catch (error) {
    console.log('shit happens during handle errors:')
    console.warn(error)
  }
}

const styles = StyleSheet.create({
  modalTitle: {
    lineHeight: 30
  },
  modalContent: {
    lineHeight: 20
  }
})
