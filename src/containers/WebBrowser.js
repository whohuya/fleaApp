/**
 * User: Coul Turing
 * Date: 2018/8/5
 * @flow
 */
import React, { PureComponent } from 'react'
import { WebView } from 'react-native'
import { connect } from 'react-redux'

@connect()
export default class WebBrowser extends PureComponent {
  render () {
    const { url } = this.props.navigation.state.params
    console.log(url)
    return <WebView style={{ flex: 1 }} source={{ uri: url }} />
  }
}
