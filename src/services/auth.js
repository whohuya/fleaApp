import { delay } from '../utils'

import { handleError, Parse, Promise } from '../utils/leancloud'
import commonHelper from '../helpers/commonHelper'

export async function login ({ username, password }) {
  // TODO: 开放了未验证手机号允许登录
  try {
    const user = await Parse.User.logIn(username, password)
    console.log(user)
    return Promise.resolve(user)
  } catch (error) {
    console.log('login error:')
    console.log(error)
    console.log('error code', error.code)
    console.log('error message', error.message)
    handleError(error)
    return Promise.resolve({ status: 'fail' })
  }
}

export async function logInWithMobilePhoneSmsCode ({
  mobilePhoneNumber,
  verificationCode
}) {
  try {
    console.log('start service')
    console.log(mobilePhoneNumber, verificationCode)
    const user = await Parse.User.logInWithMobilePhoneSmsCode(
      mobilePhoneNumber,
      verificationCode
    )
    console.log('service')
    console.log(user)
    return Promise.resolve(user)
  } catch (error) {
    console.log('login error:')
    console.log(error)
    console.log('error code', error.code)
    console.log('error message', error.message)
    handleError(error)
    return Promise.resolve({ status: 'fail' })
  }
}

export async function getCurrentUserAsync () {
  try {
    console.log(Parse.User.currentAsync())
    return await Parse.User.currentAsync()
  } catch (e) {
    console.log('error in get current user async: ', e)
  }
}

export function getCurrentUserToObject () {
  return commonHelper.parseObjectToObject(Parse.User.current())
}
export function getCurrentUser () {
  return Parse.User.current()
}

export async function getCurrentUserRoles() {
  try {
    const rolesArray = (await Parse.User.current().getRoles()) || [];
    console.warn("roles in currentUserRoles", rolesArray);
    const roles = rolesArray.map(role => role.attributes.name);

    if (roles.indexOf("Admin") >= 0) {
      return "Admin";
    } else {
      return "Guest"
    }
  } catch (error) {
    console.warn("get current user roles error: ");
    console.warn(error);
    return '';
  }
}


export async function logout () {
  try {
    console.log('log out')
    return Promise.resolve(Parse.User.logOut())
  } catch (e) {
    console.warn('logout error: ', e)
    return Promise.reject(e)
  }
}
