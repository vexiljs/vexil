import VP from '../vp'
import {
  createText,
  setAttribute,
} from '../../dom/'

export default class VText extends VP {

  /**
   * class VText
   *
   * @param {Function|String} value
   * @param {Vexil} vexil
   */

  constructor (value, vexil) {
    super(value, vexil)
    this.node = createText(value)
    this.init()
  }

  /**
   * method update
   *
   * @param {*} value
   */

  update (value) {
    setAttribute(this.node, value)
  }
}
