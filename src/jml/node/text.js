import {
  createText,
  setAttribute,
} from '../../dom/'
import watch from '../watch'
import {isFun} from '../../util/'

export default class VText {

  /**
   * class VText
   *
   * @param {Function} text
   * @param {Vexil} vexil
   */

  constructor (text, vexil) {
    if (isFun(text)) {
      this.watcher = watch(text, this.update.bind(this), vexil)
      text = this.watcher.value
      this.unbind = function unbind () {
        this.watcher.active = false
      }
      this.bind = function bind () {
        this.watcher.active = true
        this.watcher.run()
      }
      this.active = true
    }
    this.node = createText(text)
  }

  /**
   * method update
   *
   * @param {*} value
   */

  update (value) {
    setAttribute(this.node, value)
  }

  /**
   * method destroy
   */

  destroy () {
    this.watcher && this.watcher.teardown()
  }
}
