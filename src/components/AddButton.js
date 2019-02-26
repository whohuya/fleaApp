
import React from 'react'
import { StyleSheet, Text } from 'react-native'

import Touchable from './Touchable'

export const AddButton = ({ text, onAdd, ...rest }) => (
  <Touchable style={[styles.button]} onPress={() => onAdd()} >
    <Text style={{color:'#fff',fontSize:32,fontWeight:'800',marginLeft:8,marginRight:8}}>+</Text>
  </Touchable>
)

const styles = StyleSheet.create({
  button: {
    borderRadius:50,
    backgroundColor: '#1B7DE1',
    zIndex:999,
    position:'absolute',
    bottom:150,
    right:20,

  },
  text: {
    fontSize: 16,
    color: '#037aff',
  },
})

export default AddButton
