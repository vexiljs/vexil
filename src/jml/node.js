import {
  createElement,
  appendChild,
  VALUES,
} from '../dom/'
import render from './render'
import {evaluate} from './watch'
import VValue from './value'
import VAttribute from './attribute'

export default class VNode {
  constructor (jmlNode, vexil) {
    this.node = createElement(jmlNode[0])
    this.watchers = []
    this.attributes = jmlNode[1]
    this.instance = []
    this.vexil = vexil
    if (this.attributes) {
      Object.keys(this.attributes).forEach(key => {
        if (key[0] === '@') { // event
          this.node.addEventListener(key.slice(1), event => {
            this.vexil._scope.$event = event
            evaluate(this.attributes[key], this.vexil)
          })
        } else {
          let val = this.attributes[key]
          let vAttribute = VALUES[key]
          if (vAttribute) { // value
            vAttribute = new VValue(this.node, vAttribute, val, vexil)
          } else { // attribute
            vAttribute = new VAttribute(this.node, key, val, vexil)
          }
          if (vAttribute.remove) {
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
        if (vNode.remove) {
          this.watchers.push(vNode)
        }
      })
    }
  }
  remove () {
    this.watchers.forEach(v => {
      v.remove && v.remove()
    })
  }
  recover () {
    this.watchers.forEach(v => {
      v.recover && v.recover()
    })
  }
  destroy () {
    this.watchers.forEach(v => {
      v.destroy()
    })
  }
}
