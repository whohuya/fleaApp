/**
 * User: Coul Turing
 * Date: 2018/8/18
 * @flow
 */
import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'

import {Icon} from 'expo'
import {WhiteSpace} from 'antd-mobile-rn'
import { DELETE, EDIT } from '../constants/strings'
import { initialPadding } from '../constants/numbers'
import * as colors from '../constants/colors'

const PlaceItem=(props)=>{
  const {item,canEdit,editPlace,deletePlace} = props
  return  (

      <View style={styles.item}>
        <View style={styles.header}>
          <Text>
            <Text style={styles.name}>{item.name}</Text>
            {item.isDefault && (
              <Text style={styles.default}> {`(默认)`}</Text>
            )}
          </Text>
          <Text>{item.phone}</Text>
        </View>
        <WhiteSpace />
        <View>
          <Text style={styles.place}>
            {item.building && item.building.name} {item.number}
          </Text>
        </View>

        {canEdit &&
         <View style={styles.buttonGroup}>
           <TouchableOpacity
             onPress={() => editPlace(item)}
             style={{
               flexDirection: 'row',
               alignItems: 'center',
               marginRight: initialPadding
             }}
           >
             <Icon.Ionicons name='ios-create-outline' size={24} />
             <Text style={styles.place}> {EDIT}</Text>
           </TouchableOpacity>
           <TouchableOpacity
             onPress={() => deletePlace(item)}
             style={{flexDirection: 'row', alignItems: 'center'}}
           >
             <Icon.Ionicons name='ios-trash-outline' size={24} />
             <Text style={styles.place}> {DELETE}</Text>
           </TouchableOpacity>
         </View>
        }
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  item: {
    backgroundColor: '#fff',
    padding: initialPadding
  },
  name: {
    fontSize: 15
  },

  default: {
    color: colors.tianyi,
    fontSize: 14
  },

  place: {
    color: colors.grey800,
    fontSize: 14
  },

  noneText: {
    fontSize: 16,
    color: colors.grey700
  }
})

export default PlaceItem