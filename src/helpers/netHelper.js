import { NetInfo } from 'react-native'
import { Modal } from 'antd-mobile-rn'
import {
  CANCEL,
  ACCESS,
  USE_CELLULAR_CONTENT,
} from '../constants/strings'
export default class netHelper {
  static useCellular (confirm, cancel = () => {}) {
    NetInfo.getConnectionInfo().then(connectionInfo => {
      if (connectionInfo.type === 'cellular') {
        Modal.alert('', USE_CELLULAR_CONTENT, [
          {
            text: CANCEL,
            onPress: () => cancel()
          },
          {
            text: ACCESS,
            onPress: () => confirm()
          }
        ])
      } else {
        confirm()
      }
    })
  }


  static getCurrentUserRoles (currentUser) {
    const roles = []
    if (
      currentUser &&
      currentUser.get('roles') &&
      currentUser.get('roles').length > 0
    ) {
      currentUser.get('roles').forEach(role => {
        if (role.roleName && roles.indexOf(role.roleName) < 0) {
          roles.push(role.roleName)
        }
      })
    }
    return roles
  }
}
