import VP from '../vp'

import {
  createAttribute,
  setAttribute,
  applyAttribute,
} from '../../dom/'

export default class VAttribute extends VP {

  /**
   * class VAttribute
   *
   * @param {Element} node
   * @param {String} attribute
   * @param {Function|String} value
   * @param {Vexil} vexil
   */

  constructor (node, attribute, value, vexil) {
    super(value, vexil)
    this.attribute = createAttribute(attribute)
    applyAttribute(node, this.attribute)
    this.init()
  }

  /**
   * method update
   *
   * @param {*} value
   */

  update (value) {
    setAttribute(this.attribute, value)
  }
}
