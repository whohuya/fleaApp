/**
 * User: Coul Turing
 * Date: 2018/8/24
 * @flow
 */
import React, { PureComponent } from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Clipboard,
  Image,
  Linking
} from 'react-native'
import { connect } from 'react-redux'
import {
  ActivityIndicator,
  Grid,
  Toast,
  Button,
  WhiteSpace,
  Modal,
  Steps,
  List,
  Picker,
  InputItem,
  Result,
  TextareaItem,
  WingBlank
} from 'antd-mobile-rn'
import { BarCodeScanner, Camera, Permissions } from 'expo'

import { initialPadding } from '../../constants/numbers'
import * as colors from '../../constants/colors'
import { buildings } from '../../constants/optionsValues'

import { Icon } from 'expo'
import Touchable from '../../components/Touchable'
const Step = Steps.Step

@connect(state => ({
  basic: state['basic'].basic
}))
export default class ONUAdd extends PureComponent {
  static navigationOptions = {
    title: '光猫登记',
    headerTitle: '光猫登记'
  }

  state = {
    loading: false,
    step: 0,
    hasCameraPermission: null,
    sn: '',
    room: '',
    building: '',
    description: '',
    tempSn: '',
    onLight: false
  }
  async componentDidMount () {
    await this.onCameraPermission()
  }

  onCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermission: status === 'granted'
    })
  }

  onLight = () => {
    this.setState({ onLight: !this.state.onLight })
  }
  searchSn = sn => {
    this.setState({ loading: true })
    this.props.dispatch({
      type: 'ONU/search',
      payload: {
        name: 'sn',
        value: sn
      },
      callback: ONUList => {
        this.setState({ loading: false })
        if (ONUList.length > 0) {
          const content = `${ONUList[0].building}-${ONUList[0].room} ${
            ONUList[0].sn
          }`
          Modal.alert('已存在该sn，无法新增', content, [
            {
              text: '关闭',
              onPress: () => {}
            }
          ])
        } else {
          Modal.alert('SN', sn, [
            {
              text: 'Cancel',
              onPress: () => console.log('cancel'),
              style: 'cancel'
            },
            {
              text: 'OK',
              onPress: () => {
                this.setState({ sn })
                this.onNext(1)
              }
            }
          ])
        }
      }
    })
  }

  handleBarCodeRead = data => {
    const sn = data.data
    const { loading } = this.state
    this.setState({ tempSn: sn })
    if (sn.length === 16 && !loading) {
      this.searchSn(sn)
    }
  }

  inputSn = () => {
    const { onLight } = this.state
    return (
      <View style={styles.snView}>
        {this.state.hasCameraPermission === null ||
        this.state.hasCameraPermission === false ? (
            <ActivityIndicator text='正在加载' />
          ) : (
            <View style={{ width: '100%' }}>
              <Camera
                flashMode={onLight ? 'torch' : 'off'}
                onBarCodeScanned={this.handleBarCodeRead}
                style={{ height: 200 }}
              />
              <Text>{this.state.tempSn}</Text>
              <WhiteSpace />
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={this.onLight}>
                  <WingBlank size={'lg'}>
                    <Icon.Ionicons
                      name='ios-flashlight'
                      size={32}
                      color={onLight ? colors.cyan500 : 'grey'}
                    />
                  </WingBlank>
                </TouchableOpacity>
              </View>
            </View>
          )}
      </View>
    )
  }

  initialDescriptionList = () => {
    const { basic } = this.props
    const addList = basic.add || []
    return (
      <View>
        {addList.length > 0 &&
          addList.map((item, index) => (
            <WingBlank key={index}>
              <WhiteSpace />
              <Button
                type='ghost'
                inline
                size='small'
                onClick={() => this.addDescription(item.value)}
              >
                <Text>{item.name}</Text>
              </Button>
            </WingBlank>
          ))}
      </View>
    )
  }

  inputInfo = () => {
    const { room, description } = this.state
    return (
      <View>
        <List>
          <Picker
          data={buildings}
          cols={1}
          value={this.state.building}
          onChange={building => {
            this.changeValue({ building: building })
          }}
        >
          <List.Item arrow='horizontal' last>
            楼宇
          </List.Item>
        </Picker>
          <InputItem
            type='text'
            placeholder={'必填'}
            value={room}
            onChange={value => {
              this.changeValue({ room: value })
            }}
          >
            房间号
          </InputItem>
          <View style={styles.descriptionView}>
            <Text style={styles.descriptionText}>描述</Text>
            <TextareaItem
              onChange={value => {
                this.changeValue({ description: value })
              }}
              autoHeight
              value={description}
              count={2000}
            />
          </View>
        </List>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: initialPadding
          }}
        >
          <WhiteSpace />
          {this.initialDescriptionList()}
        </View>
        <View style={styles.snView}>
          <Button onClick={() => this.onSave()}>
            <Text>下一步</Text>
          </Button>
        </View>
      </View>
    )
  }

  onSave = () => {
    const { sn, room, description, building } = this.state
    const result = {
      sn: sn,
      room: room,
      building: building[0],
      description: description
      // : dateTimeHelper.getDateTimeString(new Date())
    }
    if (sn && room && description && building[0]) {
      this.props.dispatch({
        type: 'ONU/add',
        payload: result,
        callback: ONU => {
          this.onNext(2)
        }
      })
    } else {
      Toast.fail('有选项未填写!!!')
    }
  }

  onClear = () => {
    this.setState({
      step: 0,
      sn: '',
      room: '',
      building: '',
      description: '',
      tempSn: '',
      loading: false
    })
  }
  onSuccess = () => {
    return (
      <View>
        <WhiteSpace />
        <Result title='录入成功' />
        <WhiteSpace />
        <Button onClick={this.onClear}>
          <Text>继续添加</Text>
        </Button>
      </View>
    )
  }

  addDescription = value => {
    this.setState({ description: this.state.description + value })
  }

  changeValue = value => {
    this.setState(value)
  }
  onNext = value => {
    this.setState({ step: value })
  }
  render () {
    const { step, loading } = this.state
    if (loading) {
      <ActivityIndicator text='正在加载' />
    }
    return (
      <ScrollView style={styles.container}>
        {step === 0 && this.inputSn()}
        {step === 1 && this.inputInfo()}
        {step === 2 && this.onSuccess()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey100,
    flex: 1
  },
  snView: {
    flex: 1,
    margin: initialPadding,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  descriptionView: {
    margin: initialPadding
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 8
  }
})
