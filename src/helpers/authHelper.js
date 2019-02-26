import { Toast } from 'antd-mobile-rn'
import { getCurrentUser } from '../services/auth'
import { NOT_LOGIN } from '../constants/strings'
export default class authHelper {
  static  notLogin () {
    const currentUser = getCurrentUser()
    if (currentUser) {
      return true
    } else {
       Toast.offline(NOT_LOGIN, 1)
      return false
    }
  }

  static getCurrentUserTeacherIds (currentUser) {
    const teachers = []
    if (
      currentUser &&
      currentUser.get('roles') &&
      currentUser.get('roles').length > 0
    ) {
      currentUser.get('roles').forEach(role => {
        if (
          role.roleName &&
          role.roleName === 'Teacher' &&
          role.objectId &&
          teachers.indexOf(role.objectId) < 0
        ) {
          teachers.push(role.objectId)
        }
      })
    }
    return teachers
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
