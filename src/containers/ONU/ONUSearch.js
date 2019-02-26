import React, { PureComponent } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'

import { SearchBar, Tabs, Button, WingBlank } from 'antd-mobile-rn'

import ONUSearchResults from '../../components/ONUSearchResults'
import { NavigationActions } from '../../utils'
import * as colors from '../../constants/colors'
import { Icon } from 'expo'

const tabs = [
  { id: 0, title: 'sn码', value: 'sn' },
  { id: 1, title: '房间号', value: 'room' }
]

@connect(state => ({}))
class ONUSearch extends PureComponent {
  static navigationOptions = {
    title: '光猫查询',
    headerTitle: '光猫查询',
  }

  state = {
    searchInfo: tabs[0],
    search: '',
    ONUList: [],
    value: '',
    hasSearch: false,
    loading: false
  }

  componentDidMount () {}

  onDetail = item => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'ONUDetail',
        params: { id: item.id }
      })
    )
  }

  onSubmit = value => {
    this.setState({ loading: true, search: value, hasSearch: true })
    const { searchInfo } = this.state
    if (value) {
      this.props.dispatch({
        type: 'ONU/search',
        payload: {
          name: searchInfo.value,
          value: value
        },
        callback: ONUList => {
          this.setState({
            ONUList: ONUList,
            loading: false
          })
        }
      })
    } else {
      this.setState({ ONUList: [] })
    }
  }

  onChange = search => {
    this.setState({ search })
    if (!search) {
      this.setState({ search: '' })
    }
  }

  onCancel = () => {
    this.props.dispatch(NavigationActions.back())
  }

  onAdd = () => {}

  changeTab = tab => {
    this.setState({
      searchInfo: tab,
      ONUList: [],
      search: '',
      hasSearch: false
    })
  }

  render () {
    const { loading, searchInfo, ONUList, search, hasSearch } = this.state

    return (
      <View style={styles.container}>
        <Tabs
          tabs={tabs}
          initialPage={0}
          tabBarPosition='top'
          onChange={this.changeTab}
          style={{ flex: 1 }}
          swipeable={false}
        >
          <ScrollView
            style={{ flex: 1, backgroundColor: colors.grey200 }}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <SearchBar
              showCancelButton={true}
              onCancel={this.onCancel}
              placeholder={searchInfo.title}
              value={search}
              onChange={value => this.onChange(value)}
              onSubmit={value => this.onSubmit(value)}
            />
            {hasSearch && (
              <ONUSearchResults
                ONUList={ONUList}
                onDetail={this.onDetail}
                onAdd={this.onAdd}
                search={search}
                loading={loading}
              />
            )}
          </ScrollView>
        </Tabs>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  gridTitle: {
    fontSize: 16
  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})

export default ONUSearch
