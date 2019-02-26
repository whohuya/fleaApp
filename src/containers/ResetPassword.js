import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { List, InputItem, Button, WhiteSpace, WingBlank } from 'antd-mobile-rn'
import { initialPadding } from '../constants/numbers'
import * as colors from '../constants/colors'
import {
  FORGET_PASSWORD,
  USERNAME,
  PASSWORD,
  LOGIN,
  SIGN_UP,
  RESET_PASSWORD,
  PHONE_NUMBER,
  VERIFICATION_CODE,
  GET_VERIFICATION_CODE,
  NEW_PASSWORD,
  NEW_PASSWORD_VERIFY,
  SUBMITTING
} from '../constants/strings'
import LoginCloseButton from '../components/LoginCloseButton'
import CountDown from '../components/CountDown'

@connect(state => ({
  loading: state['auth'].loading,
  fetching: state['auth'].fetching
}))
class ResetPassword extends Component {
  static navigationOptions = {
    title: '重置密码'
  }

  state = {
    mobilePhoneNumber: '',
    mobilePhoneNumberError: false,
    mobilePhoneNumberSuccess: false,
    verificationCode: '',
    newPassword: '',
    newPasswordVerify: '',
    passwordError: false,
    sleep: false
  }

  resetPassword = () => {
    // 验证新旧密码是否一致、验证码是否填写
    const { verificationCode, newPassword, newPasswordVerify } = this.state
    if (newPassword !== newPasswordVerify) {
      this.setState({ passwordError: true })
    } else {
      const { dispatch } = this.props
      dispatch({
        type: 'auth/resetPassword',
        payload: {
          verificationCode,
          newPassword
        },
        callback: () => {
          this.props.navigation.goBack(this.props.navigation.state.params.from)
        }
      })
    }
  }

  getResetVerificationCode = () => {
    console.log('start getResetVerificationCode')
    const { mobilePhoneNumber } = this.state
    const { dispatch } = this.props
    console.log(mobilePhoneNumber)
    dispatch({
      type: 'auth/getResetVerificationCode',
      payload: {
        mobilePhoneNumber
      }
    })
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

  changeNewPassword = value => {
    this.setState({
      newPassword: value,
      passwordError: false
    })
  }
  changeVerificationNewPassword = value => {
    this.setState({
      newPasswordVerify: value,
      passwordError: false
    })
  }

  onClose = () => {
    this.props.navigation.goBack()
  }

  onEndCountDown = () => {
    this.setState({ sleep: false })
  }

  render () {
    const { fetching } = this.props
    console.log(fetching)
    const {
      verificationCode,
      newPassword,
      newPasswordVerify,
      passwordError,
      mobilePhoneNumber,
      mobilePhoneNumberSuccess,
      sleep
    } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.login}>
          <View
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
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
                    onClick={this.getResetVerificationCode}
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
              {verificationCode.length > 3 && (
                <View>
                  <InputItem
                    clear
                    type='password'
                    value={newPassword}
                    onChange={value => {
                      this.changeNewPassword(value)
                    }}
                  >
                    {NEW_PASSWORD}
                  </InputItem>
                  <InputItem
                    clear
                    type='password'
                    error={passwordError}
                    value={newPasswordVerify}
                    onChange={value => {
                      this.changeVerificationNewPassword(value)
                    }}
                  >
                    {NEW_PASSWORD_VERIFY}
                  </InputItem>
                </View>
              )}
              <List.Item>
                <Button
                  onClick={this.resetPassword}
                  disabled={fetching || !mobilePhoneNumberSuccess}
                  style={styles.loginButton}
                >
                  <Text style={styles.loginText}>
                    {fetching ? SUBMITTING : RESET_PASSWORD}
                  </Text>
                </Button>
              </List.Item>
            </List>
          </View>
        </View>
        {!fetching && <LoginCloseButton onClose={this.onClose} />}
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
    height: '100%',
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  loginButton: {
    backgroundColor: colors.tianyi
  },
  loginText: {
    color: '#fff'
  },
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

export default ResetPassword
