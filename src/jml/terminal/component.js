import VC from '../vc'
import Vexil from '../../index'
import {
  insertBefore,
  removeNodeByHead,
  removeChildByParent,
} from '../../dom/'

export default class VComponent extends VC {

  /**
   * class VComponent
   *
   * @param {VTerminal} terminal
   */

  constructor (terminal) {
    super(terminal)
    let name = this.attributes['component']
    this.jml = this.vexil.$components[name]
  }

  /**
   * method bind
   */

  bind () {
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
   * method unbind
   */

  unbind () {
    removeChildByParent(this.head)
  }
}
