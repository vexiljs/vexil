import watch from '../watch'
import {
  createComment,
  appendChild,
  removeChildByParent,
} from '../../dom/'
import {DIRCTIVE_HEADS} from './index'

export default class VDirective {

  /**
   * class VDirective
   *
   * @param {VTerminal} terminal
   */

  constructor (terminal) {
    let name = this.constructor.name
    name = DIRCTIVE_HEADS[name]
    this.head = createComment(name)
    appendChild(terminal.node, this.head)
    this.attributes = terminal.attributes
    this.children = terminal.children
    this.vexil = terminal.vexil
    this.vNodes = null
    terminal.watchers.push(this)
  }

  /**
   * method init
   */

  init () {
    this.watcher = watch(this.value, (value) => {
      this.update(value)
    }, this.vexil)
    this.update(this.watcher.value)
  }

  /**
   * method bind
   */

  bind () {
    this.watcher.active = true
    this.watcher.run()
  }

  /**
   * method unbind
   */

  unbind () {
    this.watcher.active = false
    this.update(null)
  }

  /**
   * method destroy
   */

  destroy () {
    this.unbind()
    this.watcher.teardown()
    removeChildByParent(this.head)
  }
}
