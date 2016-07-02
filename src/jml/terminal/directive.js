import watch from '../watch'
import {
  createComment,
  appendChild,
  removeChildByParent,
} from '../../dom/'
import {DIRCTIVE_HEADS} from './index'

export default class VDirective {
  constructor (terminal) {
    let name = this.constructor.name
    name = DIRCTIVE_HEADS[name]
    this.head = createComment(name)
    appendChild(terminal.node, this.head)
    this.attributes = terminal.jmlNode[1]
    this.children = terminal.jmlNode[2]
    this.vexil = terminal.vexil
    this.vNodes = null
    terminal.watchers.push(this)
  }
  init () {
    this.watcher = watch(this.value, (value) => {
      this.update(value)
    }, this.vexil)
    this.update(this.watcher.value)
  }
  bind () {
    this.watcher.active = true
    this.watcher.run()
  }
  unbind () {
    this.watcher.active = false
    this.update(null)
  }
  destroy () {
    this.unbind()
    this.watcher.teardown()
    removeChildByParent(this.head)
  }
}
