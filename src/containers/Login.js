import React, { Component } from 'react'
import { StyleSheet, DeviceEventEmitter, Text, View, Image } from 'react-native'
import { connect } from 'react-redux'

import { List, InputItem, Tabs, Button } from 'antd-mobile-rn'
import LoginCloseButton from '../components/LoginCloseButton'
import CountDown from '../components/CountDown'
import { NavigationActions } from '../utils'
import * as optionsValue from '../constants/optionsValues'
import * as colors from '../constants/colors'
import {
  USERNAME,
  PASSWORD,
  LOGIN,
  LOGINING,
  VERIFICATION_CODE,
  PHONE_NUMBER,
  GET_VERIFICATION_CODE
} from '../constants/strings'

@connect(state => ({
  fetching: state['auth'].fetching
}))
class Login extends Component {
  static navigationOptions = {
    title: 'Login'
  }

  state = {
    username: '',
    usernameError: false,
    password: '',
    passwordError: false,
    mobilePhoneNumber: '',
    mobilePhoneNumberError: false,
    mobilePhoneNumberSuccess: false,
    verificationCode: '',
    sleep: false
  }

  onLogin = () => {
    const { username, password } = this.state
    const { dispatch } = this.props
    dispatch({
      type: 'auth/login',
      payload: {
        username,
        password
      },
      callback: () => {
        console.log('login')

        DeviceEventEmitter.emit('loadUserInfo', 'renew') // 发监听
        this.props.navigation.goBack(this.props.navigation.state.params.from)
      }
    })
  }

  onLoginWithPhone = () => {
    const { mobilePhoneNumber, verificationCode } = this.state
    const { dispatch } = this.props
    console.log('login func')
    console.log(mobilePhoneNumber, verificationCode)
    dispatch({
      type: 'auth/logInWithMobilePhoneSmsCode',
      payload: {
        mobilePhoneNumber,
        verificationCode
      },
      callback: () => {
        DeviceEventEmitter.emit('loadUserInfo', 'renew') // 发监听
        this.props.navigation.goBack(this.props.navigation.state.params.from)
      }
    })
  }

  getVerificationCode = () => {
    console.log('start getVerificationCode')
    const { mobilePhoneNumber } = this.state
    const { dispatch } = this.props
    console.log(mobilePhoneNumber)
    dispatch({
      type: 'auth/getVerificationCode',
      payload: {
        mobilePhoneNumber
      }
    })
    // TODO: 是否应该放在callback中，如果网络错误怎么办
    this.setState({ sleep: true })
  }

  changePhoneNumber = value => {
    this.setState({
      mobilePhoneNumber: value,
      mobilePhoneNumberSuccess: false
    })
    if (value.length === 11) {
      this.setState({ mobilePhoneNumberSuccess: true })
    }
  }

  changeVerificationCode = value => {
    this.setState({
      verificationCode: value
    })
  }

  onClose = () => {
    this.props.dispatch(NavigationActions.back())
  }

  onEndCountDown = () => {
    this.setState({ sleep: false })
  }

  render () {
    const {
      mobilePhoneNumberSuccess,
      mobilePhoneNumber,
      verificationCode,
      sleep
    } = this.state
    const { fetching } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.login}>
          <Tabs tabs={optionsValue.loginTabs} initialPage={0}>
            <View>
              <List>
                <InputItem
                  clear
                  type='text'
                  value={this.state.username}
                  onChange={value => {
                    this.setState({
                      username: value
                    })
                  }}
                  placeholder='仅限内部使用'
                >
                  {USERNAME}
                </InputItem>
                <InputItem
                  clear
                  type='password'
                  value={this.state.password}
                  onChange={value => {
                    this.setState({
                      password: value
                    })
                  }}
                  placeholder=''
                >
                  {PASSWORD}
                </InputItem>
                <List.Item>
                  <Button
                    onClick={this.onLogin}
                    disabled={fetching}
                    style={styles.loginButton}
                  >
                    <Text style={styles.loginText}>
                      {fetching ? LOGINING : LOGIN}
                    </Text>
                  </Button>
                </List.Item>
              </List>
            </View>
            <View>
              <List>
                <InputItem
                  clear
                  type='text'
                  value={mobilePhoneNumber}
                  onChange={value => {
                    this.changePhoneNumber(value)
                  }}
                >
                  {PHONE_NUMBER}
                </InputItem>
                <InputItem
                  clear
                  type='text'
                  value={verificationCode}
                  onChange={value => {
                    this.changeVerificationCode(value)
                  }}
                  extra={
                    <Button
                      size='small'
                      onClick={this.getVerificationCode}
                      disabled={!mobilePhoneNumberSuccess || fetching || sleep}
                      style={styles.loginButton}
                    >
                      {sleep ? (
                        <Text style={styles.loginText}>
                          <CountDown
                            time={30}
                            onEndCountDown={this.onEndCountDown}
                          />
                        </Text>
                      ) : (
                        <Text style={styles.loginText}>
                          {GET_VERIFICATION_CODE}
                        </Text>
                      )}
                    </Button>
                  }
                >
                  {VERIFICATION_CODE}
                </InputItem>
                <List.Item>
                  <Button
                    onClick={this.onLoginWithPhone}
                    disabled={fetching || !mobilePhoneNumberSuccess}
                    style={styles.loginButton}
                  >
                    <Text style={styles.loginText}>
                      {fetching ? LOGINING : LOGIN}
                    </Text>
                  </Button>
                </List.Item>
              </List>
            </View>
          </Tabs>
        </View>
        <LoginCloseButton onClose={this.onClose} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  login: {
    height: 250
  },
  loginButton: {
    backgroundColor: colors.tianyi
  },
  loginText: {
    color: '#fff'
  }
})

export default Login
