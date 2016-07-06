import VDirective from './directive'
import render from '../render'
import {
  insertBefore,
  removeNodeByHead,
} from '../../dom/'

export default class VFor extends VDirective {

  /**
   * class VFor
   *
   * @param {VTerminal} terminal
   */

  constructor (...args) {
    super(...args)
    this.value = this.attributes['*for']
    this.scope = this.vexil._scope
    this.variable = this.attributes['_forKey']
    this.child = this.children[0]
  }

  /**
   * method update
   *
   * @param {Array} array
   */

  update (array) {
    if (this.vNodes) {
      this.vNodes.forEach(vNode => {
        removeNodeByHead(this.head, vNode.node)
        vNode.destroy()
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
      let vNode = render(this.child, this.vexil)
      insertBefore(this.head, vNode.node)
      this.vNodes.push(vNode)
    })
    this.vexil._scope = this.scope
  }

  /**
   * method insert
   */

  insert () {
    this.bind()
  }

  /**
   * method remove
   */

  remove () {
    this.unbind()
  }
}
