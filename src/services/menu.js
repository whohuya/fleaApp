import parseHelper from '../helpers/parseHelper'
// import request from '../utils/url'

const ParseBasic = 'Menu'

export async function queryFirst (payload) {
  return parseHelper.queryFirst(payload, ParseBasic)
}

// export async function getLocalWeather(){
//   return request('http://www.weather.com.cn/data/cityinfo/101180901.html')
// }
