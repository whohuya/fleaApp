/**
 * User: Coul Turing
 * Date: 2018/8/16
 * @flow
 */
import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from 'expo'

const LoginCloseButton = (props) => {
  const { onClose } = props
  return (
    <TouchableOpacity style={styles.close} onPress={onClose}>
      <Icon.Ionicons name='md-close' size={32} style={styles.icon} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  close: {
    position: 'absolute',
    right: 10,
    top: 40
  },
  icon: {
    width: 24,
    height: 24,
  }
})
export default LoginCloseButton
