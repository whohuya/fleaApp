import parseHelper from '../../helpers/parseHelper'

const ParseUser = 'User'

export async function queryAll (payload) {
  return parseHelper.queryAll(payload, ParseUser)
}