/**
 * User: Coul Turing
 * Date: 2018/11/30
 * @flow
 */
import React, { PureComponent } from 'react'
import { ExpoConfigView } from '@expo/samples';


export default class Version extends PureComponent {
  static navigationOptions = {
    title: '版本信息',
    headerTitle: '版本信息'
  }


  render () {
    return <ExpoConfigView />;
  }
}

