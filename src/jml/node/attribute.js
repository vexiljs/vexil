import {
  createAttribute,
  setAttribute,
  applyAttribute,
} from '../../dom/'
import watch from '../watch'
import {isFun} from '../../util/'

export default class VAttribute {

  /**
   * class VAttribute
   *
   * @param {Element} node
   * @param {String} attribute
   * @param {Function} value
   * @param {Vexil} vexil
   */

  constructor (node, attribute, value, vexil) {
    this.attribute = createAttribute(attribute)
    applyAttribute(node, this.attribute)
    if (isFun(value)) {
      this.watcher = watch(value, this.update.bind(this), vexil)
      this.update(this.watcher.value)
      this.unbind = function unbind () {
        this.watcher.active = false
      }
      this.bind = function bind () {
        this.watcher.active = true
        this.watcher.run()
      }
      this.active = true
    } else {
      this.update(value)
    }
  }

  /**
   * method update
   *
   * @param {*} value
   */

  update (value) {
    setAttribute(this.attribute, value)
  }

  /**
   * method destroy
   */

  destroy () {
    this.watcher && this.watcher.teardown()
  }
}
