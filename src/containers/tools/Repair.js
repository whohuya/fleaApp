import React, { PureComponent } from 'react'

import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { WhiteSpace, SearchBar, WingBlank } from 'antd-mobile-rn'
import * as colors from '../../constants/colors'
import AddButton from '../../components/AddButton'
import { NavigationActions } from '../../utils'
import { initialPadding } from '../../constants/numbers'
import SubRepair from '../../components/Repair'

@connect(state => ({}))
export default class Repair extends PureComponent {
  static navigationOptions = {
    title: '维修中心'
  }

  state = {
    repairList: [],
    loading: true,
    total: 0,
    count: 0,
    page: 1
  }

  async componentDidMount () {
    await this.loadRepairList()
  }


  loadRepairList = () => {
    this.setState({loading: true})
    this.props.dispatch({
      type: 'repair/queryFirst',
      callback: (response) => {
        this.setState({
          repairList: response,
          loading: false
        })
      }
    })
  }

  onDetail = item => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'RepairDetail',
        params: {id: item.id, refresh: this.onRefresh}
      })
    )
  }
  onAdd = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'RepairAdd',
        params: {refresh: this.onRefresh}
      })
    )
  }

  onRefresh = () => {
    this.loadRepairList(1)
  }

  emptyHeader = () => {
    const {loading} = this.state
    return <Text style={styles.footerText}>{!loading && '还没有维修任务'}</Text>
  }

  render () {

    const {repairList, loading,} = this.state
    return (
      <View style={styles.container}>
        <WhiteSpace/>
        <FlatList
          onRefresh={this.onRefresh}
          refreshing={loading}
          data={repairList}
          style={{flex: 1}}
          renderItem={({item}) => (
            <View>
              <SubRepair item={item} onDetail={this.onDetail} key={item.id}/>
              <WhiteSpace/>
            </View>
          )}
          ListEmptyComponent={this.emptyHeader}
        />
        <AddButton style={styles.addButton} onAdd={this.onAdd}/>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey100
  },
  addButton: {
    zIndex: 999,
    position: 'absolute',
    bottom: 100,
    right: 20,
    borderRadius: 50,
    backgroundColor: '#1B7DE1',
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
