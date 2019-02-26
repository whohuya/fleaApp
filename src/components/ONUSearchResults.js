import React from 'react'
import { ScrollView, Text, View } from 'react-native'

import Loading from '../components/Loading'
import * as colors from '../constants/colors'
import ONU from './ONU'

const ONUSearchResults = props => {
  const { onDetail, ONUList, loading } = props
  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <Loading />
      </View>
    )
  }
  if (ONUList.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>暂无搜索结果</Text>
      </View>
    )
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {ONUList.length > 0 &&
        ONUList.map(item => (
          <ONU item={item} onDetail={onDetail} key={item.id} />
        ))}
    </View>
  )
}
export default ONUSearchResults
