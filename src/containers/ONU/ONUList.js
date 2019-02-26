import React, { PureComponent } from 'react'

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { WhiteSpace, SearchBar, WingBlank } from 'antd-mobile-rn'
import { Icon } from 'expo'

import * as colors from '../../constants/colors'

import { NavigationActions } from '../../utils'
import { initialPadding } from '../../constants/numbers'

import authHelper from '../../helpers/authHelper'
import ONU from '../../components/ONU'
import { getCurrentUser, getCurrentUserAsync } from '../../services/auth'

@connect(state => ({}))
export default class ONUList extends PureComponent {
  static navigationOptions = {
    title: '光猫列表'
  }

  state = {
    ONUList: [],
    loading: true,
    total: 0,
    count: 0,
    page: 1
  }

  componentDidMount () {
    const { page } = this.state
    this.loadONUList(page)
  }

  loadONUList = page => {
    this.setState({ loading: true })
    if (page === 1) {
      this.setState({ ONUList: [] })
    }
    this.props.dispatch({
      type: 'ONU/fetch',
      payload: {
        sortField: 'createdAt',
        page: page
      },
      callback: ({ ONUList, current, count, pageSize }) => {
        const newONUList = [...this.state.ONUList, ...ONUList]
        this.setState({
          ONUList: newONUList,
          loading: false,
          count: count,
          total: newONUList.length,
          page: current
        })
      }
    })
  }

  onDetail = ONU => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'ONUDetail',
        params: { id: ONU.id, refresh: this.onRefresh }
      })
    )
  }

  onRefresh = () => {
    this.loadONUList(1)
  }

  onEndReached = () => {
    const { page, count, ONUList, total, loading } = this.state
    if (total < count && !loading) {
      this.loadONUList(page + 1)
    }
  }

  renderFooter = () => {
    const { loading, count, total } = this.state
    if (loading || (!loading && count === 0)) {
      return null
    }
    return total >= count ? (
      <Text style={styles.footerText}>没有更多啦</Text>
    ) : (
      <TouchableOpacity onPress={this.onEndReached}>
        <Text style={styles.footerText}>加载更多</Text>
      </TouchableOpacity>
    )
  }
  emptyHeader = () => {
    const { loading } = this.state
    return <Text style={styles.footerText}>{!loading && '还没有光猫'}</Text>
  }

  render () {
    const { ONUList, loading, total, count } = this.state
    return (
      <View style={styles.container}>
        <WhiteSpace />
        <WingBlank>
          <Text>共计{count}个</Text>
        </WingBlank>
        <WhiteSpace />
        <FlatList
          onRefresh={this.onRefresh}
          refreshing={loading}
          ListFooterComponent={this.renderFooter}
          data={ONUList}
          style={{ flex: 1 }}
          renderItem={({ item }) => (
            <View>
              <ONU item={item} onDetail={this.onDetail} key={item.id} />
              <WhiteSpace />
            </View>
          )}
          ListEmptyComponent={this.emptyHeader}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey100
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
