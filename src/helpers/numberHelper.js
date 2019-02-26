import numeral from 'numeral'
import { longEdgeMaxLength } from '../constants/numbers'

export default class numberHelper {
  static RMB (val) {
    return `&yen; ${numeral(val).format('0,0')}`
  }

  static fixedZero (val) {
    return val * 1 < 10 ? `0${val}` : val
  }

  static max (a: number, b: number): number {
    return a > b ? a : b
  }

  static calculateWidthHeight (payload: Object) {
    let { height, width } = payload
    const maxNumber = this.max(height, width)
    if (maxNumber > longEdgeMaxLength) {
      height = parseInt((height * longEdgeMaxLength) / maxNumber)
      width = parseInt((width * longEdgeMaxLength) / maxNumber)
    }
    return { height, width }
  }
  static add (a, b) {
    const x = numeral(a)
    return x.add(b)._value
  }

  static subtract (a, b) {
    const x = numeral(a)
    return x.subtract(b)._value
  }
  static multiply (a, b) {
    const x = numeral(a)
    return x.multiply(b)._value
  }
  static divide (a, b) {
    const x = numeral(a)
    return x.divide(b)._value
  }
}
