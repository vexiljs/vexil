import watch from './watch'
import {isFun} from '../util/'

export default class VP {

  /**
   * class VP
   *
   * @param {Function|String} value
   * @param {Vexil} vexil
   */

  constructor (value, vexil) {
    this.value = value
    this.vexil = vexil
    this.watcher = null
  }

  /**
   * method init
   */

  init () {
    if (isFun(this.value)) {
      this.watcher = watch(
        this.value,
        this.update.bind(this),
        this.vexil
      )
      this.update(this.watcher.value)
      this.bind = VP.bind
      this.unbind = VP.unbind
    } else {
      this.update(this.value)
    }
  }

  /**
   * method destroy
   */

  destroy () {
    this.watcher && this.watcher.teardown()
  }

  /**
   * static method bind
   */

  static bind () {
    this.watcher.active = true
    this.watcher.run()
  }

  /**
   * static method unbind
   */

  static unbind () {
    this.watcher.active = false
  }
}
