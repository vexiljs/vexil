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
   * method bind
   */

  bind () {
    if (isFun(this.value)) {
      this.watcher = watch(
        this.value,
        this.update.bind(this),
        this.vexil
      )
      this.update(this.watcher.value)
      this.suspend = VP.suspend
      this.resume = VP.resume
    } else {
      this.update(this.value)
    }
  }

  /**
   * method unbind
   */

  unbind () {
    if (this.watcher) {
      this.watcher.teardown()
      this.watcher = null
    }
  }

  /**
   * static method suspend
   */

  static suspend () {
    this.watcher.active = true
    this.watcher.run()
  }

  /**
   * static method resume
   */

  static resume () {
    this.watcher.active = false
  }
}
