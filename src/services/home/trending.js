import parseHelper from '../../helpers/parseHelper'

const ParseTrending = 'Trending'

export async function find(payload){
  return parseHelper.find(payload,ParseTrending)
}
