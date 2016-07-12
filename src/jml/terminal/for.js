import VC from '../vc'
import render from '../render'
import {
  insertBefore,
  removeNodeByHead,
} from '../../dom/'

export default class VFor extends VC {

  /**
   * class VFor
   *
   * @param {VTerminal} terminal
   */

  constructor (terminal) {
    super(terminal)
    this.value = this.attributes['*for']
    this.scope = this.vexil._scope
    this.variable = this.attributes['_forKey']
    this.child = this.childNodes[0]
  }

  /**
   * method update
   *
   * @param {Array} array
   */

  update (array) {
    if (this.vNodes) {
      this.vNodes.forEach(vNode => {
        removeNodeByHead(this.terminal.head, vNode.node)
        vNode.unbind()
      })
      this.vNodes = null
    }
    if (!array || !array.length) {
      this.vNodes = null
      return
    }
    this.vNodes = []
    let newScope = Object.assign({}, this.scope)
    this.vexil._scope = newScope
    array.forEach((v, k) => {
      newScope[this.variable] = v
      newScope.$index = k
      let vNode = render(this.child, this.vexil, this.terminal)
      insertBefore(this.terminal.head, vNode.node)
      this.vNodes.push(vNode)
    })
    this.vexil._scope = this.scope
  }

  /**
   * method insertChildren
   */

  insertChildren () {
    this.suspend()
  }

  /**
   * method removeChildren
   */

  removeChildren () {
    this.resume()
  }
}
