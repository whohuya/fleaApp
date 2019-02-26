/**
 * User: Coul Turing
 * Date: 2018/8/24
 * @flow
 */
import React, { PureComponent } from 'react'
import {
  View,
  StyleSheet,
  Text,
} from 'react-native'
import { connect } from 'react-redux'
import {
  Button,
  WhiteSpace,
  WingBlank,
  Steps,
  List,
  Picker,
  InputItem,
  TextareaItem,

} from 'antd-mobile-rn'

import { initialPadding } from '../../constants/numbers'
import * as colors from '../../constants/colors'
import { toID, levelList } from '../../constants/optionsValues'

@connect()
export default class RepairAdd extends PureComponent {
  static navigationOptions = {
    title: '维修登记',
    headerTitle: '维修登记'
  }

  state = {
    toId: [],
    level: [levelList[1].value.toString()],
    content: '',
    title: '',
    userList:[],
    levelList: levelList.map(item => {return {...item, value: item.value.toString()}})
  }

  async componentDidMount () {
    await this.onLoadUsers()

  }

  async componentWillUnmount () {
    const {refresh} = this.props.navigation.state.params
    refresh()
  }

  onLoadUsers = () => {
    this.props.dispatch({
      type: 'userCenter/users/fetchAll',
      callback:(userList)=>{
        this.setState({
          userList
        })
      },
    })
  }

  onSubmit = () => {
    const {toId, level, content, title} = this.state
    console.log(toId[0])
    this.props.dispatch({
      type: 'repair/add',
      payload: {
        title,
        content,
        level: parseInt(level[0]),
        toId: toId[0]
      },
      callback: () => {
        this.props.navigation.goBack()
      }
    })
  }

  render () {
    const {toId, level, content, title,userList,levelList} = this.state
    return <View>
      <List renderHeader={'登记基本信息'}>
        <InputItem
          placeholder={'任务名'}
          value={title}
          onChange={value => {
            this.setState({
              title: value,
            })
          }}
        >
          任务名
        </InputItem>
        <WhiteSpace/>
        <WingBlank><Text>任务详情</Text>
        <TextareaItem
          rows={4}
          autoHeight
          placeholder={'任务详情'}
          value={content}
          onChange={value => {
            this.setState({
              content: value,
            })
          }}
        />
        </WingBlank>
        <WhiteSpace/>
        <Picker
          data={userList}
          cols={1}
          value={toId}
          onChange={id => {
            this.setState({
              toId: id
            })
          }}
        >
          <List.Item arrow='horizontal' last>
            指派至
          </List.Item>
        </Picker>
        <Picker
          data={levelList}
          cols={1}
          value={level}
          onChange={level => {
            this.setState({
              level: level
            })
          }}
        >
          <List.Item arrow='horizontal' last>
            优先级
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
