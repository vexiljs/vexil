import VN from '../vn'
import render from '../render'
import vEvent from './event'
import VProperty from './property'
import VAttribute from './attribute'
import {
  createElement,
  appendChild,
} from '../../dom/'
import {PROPERTIES} from '../../dom/constant'

export default class VNode extends VN {

  /**
   * class VNode
   *
   * @param {Array} jml
   * @param {Vexil} vexil
   */

  constructor (...args) {
    super(...args)
    this.node = createElement(this.name)
    if (this.attributes) {
      Object.keys(this.attributes).forEach(key => {
        if (key[0] === '@') { // event
          vEvent(this.node, key.slice(1), this.attributes[key], this.vexil)
        } else {
          let val = this.attributes[key]
          let vAttribute = PROPERTIES[key]
          if (vAttribute) { // value
            vAttribute = new VProperty(this.node, vAttribute, val, this.vexil)
          } else { // attribute
            vAttribute = new VAttribute(this.node, key, val, this.vexil)
          }
          if (vAttribute.unbind) {
            this.watchers.push(vAttribute)
          }
        }
      })
    }
    if (this.children) {
      let vNode
      this.children.forEach(child => {
        vNode = render(child, this.vexil)
        appendChild(this.node, vNode.node)
        if (vNode.unbind) {
          this.watchers.push(vNode)
        }
      })
    }
  }
}
