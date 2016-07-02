import {
  createAttribute,
  setAttribute,
  applyAttribute,
} from '../dom/'
import watch from './watch'
import {isFun} from '../util/'

export default class VAttribute {
  constructor (node, attribute, value, vexil, scope) {
    this.attribute = createAttribute(attribute)
    applyAttribute(node, this.attribute)
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
    setAttribute(this.attribute, value)
  }
  destroy () {
    this.watcher && this.watcher.teardown()
  }
}
