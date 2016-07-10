import watch from './watch'
import {
  createComment,
  appendChild,
  removeChildByParent,
} from '../dom/'
import {DIRCTIVE_HEADS} from './terminal/'

export default class VC {

  /**
   * class VC
   *
   * @param {VTerminal} terminal
   */

  constructor (terminal) {
    let name = this.constructor.name
    name = DIRCTIVE_HEADS[name]
    this.head = createComment(name)
    appendChild(terminal.node, this.head)
    this.attributes = terminal.attributes
    this.childNodes = terminal.childNodes
    this.vexil = terminal.vexil
    this.vNodes = null
    terminal.watchers.push(this)
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
