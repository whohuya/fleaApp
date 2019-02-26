import React from "react"
import { View, Text } from "react-native"
import * as colors from "../constants/colors"

const ThemeLine = ({ name, textStyle, lineStyle }) => (
    <View style={[styles.lineStyle, lineStyle]}>
      <Text style={[styles.textStyle, textStyle]}>{name}</Text>
    </View>
  )

const styles = {
  lineStyle: {
    flex: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  textStyle: {
    color: colors.deepOrange500
  }
}

export default ThemeLine
