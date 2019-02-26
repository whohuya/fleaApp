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
  PickerView,
  InputItem,
  Result,
  TextareaItem,
  WingBlank
} from 'antd-mobile-rn'
import { BarCodeScanner, Camera, Permissions } from 'expo'

import { initialPadding } from '../../constants/numbers'
import * as colors from '../../constants/colors'
import { toID, levelList,replyStateList} from '../../constants/optionsValues'

import { Icon } from 'expo'
import Touchable from '../../components/Touchable'

const Step = Steps.Step

@connect()
export default class ReplyAdd extends PureComponent {
  static navigationOptions = {
    title: '填写回执',
    headerTitle: '填写回执'
  }

  state = {
    toId:'',
    replyState:'',
    content: '',
    title: '',
    levelList: levelList.map(item => {return {...item, value: item.value.toString()}})
  }

  async componentDidMount () {
    await this.onCameraPermission()

  }
  
  onSubmit = () => {
    const {toId, level, content,replyState} = this.state
    const {item} = this.props.navigation.state.params

    console.log('ITEM ')
    console.log(replyState[0])
    this.props.dispatch({
      type: 'reply/add',
      payload: {
        content,
        taskId:item.id,
        state:replyState[0]==='1'?true:replyState[0]==='2'?false:undefined,
      },
      callback: () => {
        this.props.navigation.goBack()
      }
    })
  }

  render () {
   const {content,replyState}=this.state
    return <View>
      <List renderHeader={'回执详情'}>
        <TextareaItem
          rows={4}
          placeholder={'回执详情'}
          value={content}
          onChange={value => {
            this.setState({
              content: value,
            })
          }}
        >
        </TextareaItem>
      </List>
      <List renderHeader={'完成情况'}>
        <Picker
          data={replyStateList}
          cols={1}
          value={replyState}
          onChange={replyState => {
            this.setState({
              replyState
            })
          }}
        >
          <List.Item arrow='horizontal' last>
            当前状态
          </List.Item>
        </Picker>
        <WhiteSpace/>
        <WhiteSpace/>
        <Button
          onClick={() => this.onSubmit()}
          type={'primary'}>
          发布任务
        </Button>
      </List>
    </View>
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
