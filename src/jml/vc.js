import watch from './watch'
import {removeChildByParent} from '../dom/'

export default class VC {

  /**
   * abstract class VC
   *
   * @param {VTerminal} terminal
   */

  constructor (terminal) {
    this.terminal = terminal
    this.attributes = terminal.attributes
    this.childNodes = terminal.childNodes
    this.children = terminal.children
    this.vexil = terminal.vexil
    this.vNodes = null
    terminal.watchers.push(this)
    this.next = terminal
  }

  /**
   * method bind
   */

  bind () {
    this.watcher = watch(this.value, (value) => {
      this.update(value)
    }, this.vexil)
    this.update(this.watcher.value)
  }

  /**
   * method suspend
   */

  suspend () {
    this.watcher.active = true
    this.watcher.run()
  }

  /**
   * method resume
   */

  resume () {
    this.watcher.active = false
    this.update(null)
  }

  /**
   * method unbind
   */

  unbind () {
    this.resume()
    this.watcher.teardown()
    removeChildByParent(this.head)
  }
}
