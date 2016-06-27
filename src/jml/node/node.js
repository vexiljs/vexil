import {
  createElement,
  createAttribute,
  setAttribute,
  applyAttribute,
  appendChild,
  VALUES,
} from '../../dom/'
import {
  evaluate,
  bind,
} from '../bind'
import render from '../render'

export default function createNode (node, attributes, children, vexil, scope) {
  node = createElement(node)
  attributes && applyAttributes(node, attributes, vexil, scope)
  children && appendChildren(node, children, vexil, scope)
  return node
}

function applyAttributes (node, attributes, vexil, scope) {
  let attr
  Object.keys(attributes).forEach(key => {
    if (key[0] === '@') { // event
      node.addEventListener(key.slice(1), (event) => {
        scope.$event = event
        evaluate(attributes[key], vexil, scope)
      })
    } else {
      let val = attributes[key]
      let prop = VALUES[key]
      if (prop) {
        if (typeof val === 'function') {
          bind(val, (newVal, oldVal) => {
            node[prop] = newVal
          }, vexil, scope)
        } else {
          node[prop] = val
        }
      } else {
        attr = createAttribute(key)
        if (typeof val === 'function') {
          bind(val, (newVal, oldVal) => {
            setAttribute(attr, newVal)
            applyAttribute(node, attr)
          }, vexil, scope)
        } else {
          setAttribute(attr, val)
          applyAttribute(node, attr)
        }
      }
    }
  })
}

function appendChildren (node, children, vexil, scope) {
  children.forEach(child => {
    appendChild(node, render(child, vexil, scope))
  })
}
