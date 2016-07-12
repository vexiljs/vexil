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
    this.instance = new Vexil(this.jml, this.vexil)
    this.watchers = this.instance.$vdom.watchers
    this.insertChildren()
  }

  /**
   * method suspend
   */

  suspend () {
    this.watchers.forEach(v => v.suspend())
  }

  /**
   * method resume
   */

  resume () {
    this.watchers.forEach(v => v.resume())
  }

  /**
   * method insertChildren
   */

  insertChildren () {
    insertBefore(this.terminal.head, this.instance.$dom)
    if (this.instance.$mount) {
      this.instance.$mount()
    }
  }

  /**
   * method removeChildren
   */

  removeChildren () {
    removeNodeByHead(this.terminal.head, this.instance.$dom)
  }

  /**
   * method unbind
   */

  unbind () {
    removeChildByParent(this.head)
  }
}
