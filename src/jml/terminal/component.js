import VDirective from './directive'
import Vexil from '../../index'
import {
  insertBefore,
  removeNodeByHead,
  removeChildByParent,
} from '../../dom/'

export default class VComponent extends VDirective {
  constructor (...args) {
    super(...args)
    let name = this.attributes['component']
    this.jml = this.vexil.$components[name]
  }
  init () {
    this.instance = new Vexil(this.jml)
  }
  update () {
  }
  insert () {
    insertBefore(this.head, this.instance.$dom)
    if (this.instance.$mount) {
      this.instance.$mount()
    }
  }
  remove () {
    removeNodeByHead(this.head, this.instance.$dom)
  }
  destroy () {
    removeChildByParent(this.head)
  }
}
