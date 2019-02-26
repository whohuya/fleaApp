import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { connect } from 'react-redux'
import {
  List,
  InputItem,
  Button,
  Flex,
  ActivityIndicator
} from 'antd-mobile-rn'

import { NavigationActions } from '../utils'
import * as colors from '../constants/colors'
import CountDown from '../components/CountDown'
import {
  SIGN_UP,
  VERIFICATION_CODE,
  PHONE_NUMBER,
  GET_VERIFICATION_CODE,
  SIGN_UP_ING
} from '../constants/strings'
import LoginCloseButton from '../components/LoginCloseButton'

@connect(state => ({
  loading: state['auth'].loading,
  fetching: state['auth'].fetching
}))
export default class SignUp extends Component {
  static navigationOptions = {
    title: 'SignUp'
  }

  state = {
    mobilePhoneNumber: '',
    mobilePhoneNumberError: false,
    mobilePhoneNumberSuccess: false,
    verificationCode: '',
    sleep: false
  }

  componentDidMount () {
  }

  onSignUp = () => {
    const { mobilePhoneNumber, verificationCode } = this.state
    const { dispatch } = this.props
    console.log('sign up')
    console.log(mobilePhoneNumber)
    dispatch({
      type: 'auth/signUp',
      payload: {
        mobilePhoneNumber,
        verificationCode
      },
      callback: () => {
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
    const { fetching } = this.props
    const {
      mobilePhoneNumberSuccess,
      mobilePhoneNumber,
      sleep,
      verificationCode
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
                  onClick={this.onSignUp}
                  disabled={fetching || !mobilePhoneNumberSuccess}
                  style={styles.loginButton}
                >
                  <Text style={styles.loginText}>
                    {fetching ? SIGN_UP_ING : SIGN_UP}
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
  }
})
