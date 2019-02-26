import React, { PureComponent } from 'react'

import { View, Text, StyleSheet } from 'react-native'
import { List, Button, Modal } from 'antd-mobile-rn'
import { connect } from 'react-redux'
import { WhiteSpace } from 'antd-mobile-rn'
import * as colors from '../../constants/colors'

import { initialPadding } from '../../constants/numbers'
import Loading from '../../components/Loading'
import dateTimeHelper from '../../helpers/dateTimeHelper'
import { CONFIRM, CANCEL } from '../../constants/strings'
import { getCurrentUserAsync, getCurrentUserRoles } from '../../services/auth'
import commonHelper from '../../helpers/commonHelper'

const Item = List.Item

@connect(state => ({}))
export default class ONUList extends PureComponent {
  static navigationOptions = {
    title: '光猫信息'
  }

  state = {
    ONU: {},
    loading: true,
    userInfo: null
  }

  async componentDidMount () {
    const { id } = this.props.navigation.state.params
    const role = await getCurrentUserRoles()
    this.setState({ role })
    this.loadONUInfo(id)
  }

  loadONUInfo = id => {
    this.setState({ loading: true })
    this.props.dispatch({
      type: 'ONU/get',
      payload: {
        id: id,
        includes: ['creator']
      },
      callback: ONU => {
        this.setState({
          loading: false,
          ONU: ONU
        })
      }
    })
  }

  onDelete = () => {
    const { id, refresh } = this.props.navigation.state.params
    Modal.alert('', '确认要删除吗', [
      {
        text: CANCEL,
        onPress: () => {}
      },
      {
        text: CONFIRM,
        onPress: () => {
          this.props.dispatch({
            type: 'ONU/delete',
            payload: {
              id: id
            },
            callback: () => {
              this.props.navigation.goBack()
              refresh()
            }
          })
        }
      }
    ])
  }
  render () {
    const { ONU, loading, role } = this.state
    if (loading) {
      return (
        <View style={styles.container}>
          <Loading />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <WhiteSpace />
        <List>
          <Item extra={`${ONU.building}-${ONU.room}`} arrow='empty'>
            位置
          </Item>
          <Item extra={ONU.sn} arrow='empty'>
            sn
          </Item>

          <Item multipleLine extra={ONU.description} arrow='empty'>
            描述
          </Item>
          <Item
            extra={(ONU.creator && ONU.creator.name) || '已删除用户'}
            arrow='empty'
          >
            登记人
          </Item>
          <Item
            extra={dateTimeHelper.getDateTimeString(ONU.createdAt)}
            arrow='empty'
          >
            登记时间
          </Item>
          <Item
            extra={dateTimeHelper.getDateTimeString(ONU.updatedAt)}
            arrow='empty'
          >
            更新时间
          </Item>
        </List>
        <WhiteSpace />
        {role === 'Admin' && (
          <Button onClick={this.onDelete}>
            <Text>删除</Text>
          </Button>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  ONUs: {},
  tabs: {
    flex: 1
  },
  footerText: {
    textAlign: 'center',
    padding: initialPadding,
    color: colors.grey600
  }
})
