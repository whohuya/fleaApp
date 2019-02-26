import parseHelper from '../../helpers/parseHelper'
import { Parse, Promise } from '../../utils/leancloud'
import { getCurrentUser } from '../auth'
import { FileSystem } from 'expo'
const ParsePlace = 'UserInfo'

export async function queryAllWithUser (payload) {
  return parseHelper.queryAllWithUser(payload, ParsePlace)
}

export async function update (payload) {
  return parseHelper.update(payload, ParsePlace)
}

export async function updateAvatar (payload) {
  const name = 'avatar.jpg'
  const fileItem = {
    blob: {
      uri: payload.avatar
    }
  }
  try {
    const file = new Parse.File(name, fileItem)
    const newFile = await file.save()
    const parseObject = Parse.Object.createWithoutData(
      ParsePlace,
      payload.userInfo.id
    )

    parseObject.set('avatar', newFile)
    const newUserInfo = await parseObject.save()

    return newUserInfo.get('avatar').get('url')
  } catch (error) {
    console.log('error')
    console.log(error)
    return Promise.reject(e)
  }
}
