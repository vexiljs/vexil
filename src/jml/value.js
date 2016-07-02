import watch from './watch'
import {isFun} from '../util/'

export default class VValue {
  constructor (node, property, value, vexil, scope) {
    this.node = node
    this.property = property
    if (isFun(value)) {
      this.watcher = watch(value, this.update.bind(this), vexil, scope)
      this.update(this.watcher.value)
      this.remove = function remove () {
        this.watcher.active = false
      }
      this.recover = function recover () {
        this.watcher.active = true
        this.watcher.run()
      }
    } else {
      this.update(value)
    }
  }
  update (value) {
    this.node[this.property] = value
  }
  destroy () {
    this.watcher && this.watcher.teardown()
  }
}
