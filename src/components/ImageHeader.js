/**
 * User: Coul Turing
 * Date: 2018/7/30
 * @flow
 */
import React from 'react'
import { View, ImageBackground, Text, StyleSheet } from 'react-native'
import { initialPadding } from '../constants/numbers'

const CategoryHeader = props => {
  const { name } = props
  return (
    <ImageBackground
      source={{
        url:
          'http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/bitmap-d4f7b37e32.png'
      }}
      style={styles.categoryHeader}
    >
      <Text style={styles.categoryText}>{name}</Text>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  categoryHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: initialPadding,
    height: 140,
    width: '100%'
  },
  categoryText: {
    fontSize: 16
  }
})
export default ImageBackground
