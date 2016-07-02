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

let uid = 0

export default class VNode extends VN {
  constructor (jmlNode, vexil) {
    super()
    this.uid = uid++
    this.node = createElement(jmlNode[0])
    this.attributes = jmlNode[1]
    if (this.attributes) {
      Object.keys(this.attributes).forEach(key => {
        if (key[0] === '@') { // event
          vEvent(this.node, key.slice(1), this.attributes[key], vexil)
        } else {
          let val = this.attributes[key]
          let vAttribute = PROPERTIES[key]
          if (vAttribute) { // value
            vAttribute = new VProperty(this.node, vAttribute, val, vexil)
          } else { // attribute
            vAttribute = new VAttribute(this.node, key, val, vexil)
          }
          if (vAttribute.unbind) {
            this.watchers.push(vAttribute)
          }
        }
      })
    }
    this.children = jmlNode[2]
    if (this.children) {
      let vNode
      this.children.forEach(child => {
        vNode = render(child, vexil)
        appendChild(this.node, vNode.node)
        if (vNode.unbind) {
          this.watchers.push(vNode)
        }
      })
    }
  }
}
