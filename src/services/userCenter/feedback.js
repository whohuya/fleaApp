import parseHelper from '../../helpers/parseHelper'

const ParsePlace = 'Feedback'

export async function add (payload) {
  console.log(payload)
  return parseHelper.add(payload,ParsePlace,)
}

