import React, { PureComponent } from 'react'

import { View, Text, StyleSheet } from 'react-native'
import { List, Button, Modal,  } from 'antd-mobile-rn'
import { connect } from 'react-redux'
import { WhiteSpace ,Card,TextareaItem} from 'antd-mobile-rn'
import * as colors from '../../constants/colors'
import { NavigationActions } from '../../utils'

import { initialPadding } from '../../constants/numbers'
import Loading from '../../components/Loading'
import dateTimeHelper from '../../helpers/dateTimeHelper'
import { levelList } from '../../constants/optionsValues'
import { CONFIRM, CANCEL } from '../../constants/strings'
import { getCurrentUser, getCurrentUserAsync,  } from '../../services/auth'
import commonHelper from '../../helpers/commonHelper'

const Item = List.Item

@connect(state => ({}))
export default class RepairDetail extends PureComponent {
  static navigationOptions = {
    title: '维修详情'
  }

  state = {
    item: {},
    reply:[],
    needRefresh:false,
    loading: true,
    userInfo: null,
    currentUser:null,
  }

  async componentDidMount () {
    const {id} = this.props.navigation.state.params
    await this.loadRepairInfo(id)
  }

  async componentWillUnmount () {
    const {refresh} = this.props.navigation.state.params
    refresh()
  }

  loadRepairInfo = async id => {
    const user= await getCurrentUserAsync()
    await this.setState({loading: true})
    await this.props.dispatch({
      type: 'repair/get',
      payload: {
        id: id,
        includes: ['from', 'to'],
      },
      callback: async item => {
        this.setState({
          loading: false,
          item: item,
          currentUser:user,
        })
        await this.isWorker(item)
        await this.loadReply(item)
      }
    })

  }
  loadReply=(item)=>{
    const {id}=item
    this.props.dispatch({
      type:'reply/find',
      payload:{
        taskId:id,
      },
      callback:(response)=>{
       this.setState({
         reply:response
       })
      }
    })
  }
  isWorker = async (item) => {
    const user = await getCurrentUserAsync()
    item.state === 0 && item.to.id === user.id && this.changeRepairState(item)
  }
  changeRepairState = (item) => {
    this.props.dispatch({
      type: 'repair/changeState',
      payload: {
        id: item.id,
      },
    })
    this.setState({ needRefresh:true})
  }
  onDelete = () => {
    const {id, refresh} = this.props.navigation.state.params
    console.log('delete id')
    console.log(id)
    Modal.alert('', '确认要删除吗', [
      {
        text: CANCEL,
        onPress: () => {}
      },
      {
        text: CONFIRM,
        onPress: () => {
          this.props.dispatch({
            type: 'repair/delete',
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
  setReply=(item)=>{
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'ReplyAdd',
        params: {item}
      })
    )
  }
  render () {
    const {loading, role, item,currentUser,reply} = this.state
    if (loading) {
      return (
        <View style={styles.container}>
          <Loading/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <WhiteSpace/>
        <List>
          <Item extra={commonHelper.transferLevelValueToLabel(item.level, levelList)} arrow='empty'>
            优先级
          </Item>
          <Item extra={item.from ? item.from.name : '已删除用户'} arrow='empty'>
            委派人
          </Item>

          <Item multipleLine extra={item.to ? item.to.name : '已删除用户'} arrow='empty'>
            指派至
          </Item>
          <Item
          extra={(item.title) || '任务名为空'}
          arrow='empty'
        >
          任务名
        </Item>
          <Item
            extra={(item.content) || '任务详情为空'}
            arrow='empty'
          >
            任务详情
          </Item>
          <Item
            extra={dateTimeHelper.getDateTimeString(item.createdAt)}
            arrow='empty'
          >
            登记时间
          </Item>
          <Item
            extra={dateTimeHelper.getDateTimeString(item.updatedAt)}
            arrow='empty'
          >
            更新时间
          </Item>
        </List>
        <WhiteSpace/>
        {reply.map(item=>(<Card style={styles.repair} key={item.id}>
          <Card.Body style={styles.repairBody}>
            <Text>回执信息:</Text>
              <Text>{item.content}</Text>
            <Text style={{color:colors.blue600}}>{item.state===false?'无法完成':item.state===true?'已完成':'未完成'}</Text>
          </Card.Body>
        </Card>))}

        <WhiteSpace/>
        {item.from.id===currentUser.id &&(
          <Button onClick={this.onDelete}>
            <Text>删除</Text>
          </Button>
        )}
        {item.to.id===currentUser.id&&(<Button onClick={()=>{this.setReply(item)}}>
          <Text>填写回执</Text>
        </Button>)}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  repair:{
  },
  repairBody:{
    marginLeft:8,
  },
  tabs: {
    flex: 1
  },
  footerText: {
    textAlign: 'center',
    padding: initialPadding,
    color: colors.grey600
  }
})
