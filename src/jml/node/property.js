import VP from '../vp'

export default class VProperty extends VP {

  /**
   * class VProperty
   *
   * @param {Element} node
   * @param {String} property
   * @param {Function|String} value
   * @param {Vexil} vexil
   */

  constructor (node, property, value, vexil) {
    super(value, vexil)
    this.node = node
    this.property = property
    this.bind()
  }

  /**
   * method update
   *
   * @param {*} value
   */

  update (value) {
    this.node[this.property] = value
  }
}
