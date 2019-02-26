import parseHelper from '../../helpers/parseHelper'

const ParseProduct = 'Banner'

export async function find(payload){
  return parseHelper.find(payload,ParseProduct,'lowerLimit')
}
