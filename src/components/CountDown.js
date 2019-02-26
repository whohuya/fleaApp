/**
 * User: Coul Turing
 * Date: 2018/8/21
 * @flow
 */

import React, { PureComponent } from 'react'
import { Text } from 'react-native'

export default class CountDown extends PureComponent {
  state = {
    second: this.props.time
  }

  componentDidMount () {
    this.countDown()
  }

  sleep = () =>
    new Promise(resolve => {
      setTimeout(resolve, 1000)
    })

  countDown = async () => {
    const { time, onEndCountDown } = this.props

    for (let i = time; i > 0; i--) {
      console.log(i)
      await this.sleep()
      this.setState({ second: this.state.second - 1 })
    }
    console.log('end')
    onEndCountDown()
  }

  render () {
    return this.state.second + ' 秒'
  }
}
