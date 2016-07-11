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
   * @param {VN} [parent]
   */

  constructor (value, vexil, parent) {
    super(value, vexil)
    this.node = createText(value)
    this.bind()
    if (parent) {
      this.parent = parent
      this.root = parent.root
      parent.children.push(this)
    } else {
      this.parent = null
    }
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
