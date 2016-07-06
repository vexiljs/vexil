import VDirective from './directive'
import Vexil from '../../index'
import {
  insertBefore,
  removeNodeByHead,
  removeChildByParent,
} from '../../dom/'

export default class VComponent extends VDirective {

  /**
   * class VComponent
   *
   * @param {VTerminal} terminal
   */

  constructor (...args) {
    super(...args)
    let name = this.attributes['component']
    this.jml = this.vexil.$components[name]
  }

  /**
   * method init
   */

  init () {
    this.instance = new Vexil(this.jml)
  }

  /**
   * method update
   */

  update () {
  }

  /**
   * method insert
   */

  insert () {
    insertBefore(this.head, this.instance.$dom)
    if (this.instance.$mount) {
      this.instance.$mount()
    }
  }

  /**
   * method remove
   */

  remove () {
    removeNodeByHead(this.head, this.instance.$dom)
  }

  /**
   * method destroy
   */

  destroy () {
    removeChildByParent(this.head)
  }
}
