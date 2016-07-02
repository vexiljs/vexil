import {
  createText,
  setAttribute,
} from '../dom/'
import watch from './watch'
import {isFun} from '../util/'

export default class VText {
  constructor (text, vexil) {
    if (isFun(text)) {
      this.watcher = watch(text, this.update.bind(this), vexil)
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
