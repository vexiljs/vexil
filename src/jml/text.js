import {
  createText,
  setAttribute,
} from '../dom/'
import watch from './watch'

export default class VText {
  constructor (text, vexil, scope) {
    if (typeof text === 'function') {
      this.watcher = watch(text, this.update.bind(this), vexil, scope)
      text = this.watcher.value
      this.remove = function remove () {
        this.watcher.active = false
      }
      this.recover = function recover () {
        this.watcher.active = true
        this.watcher.run()
      }
    }
    this.node = createText(text)
  }
  update (value) {
    setAttribute(this.node, value)
  }
  destroy () {
    this.watcher && this.watcher.teardown()
  }
}
