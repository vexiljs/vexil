import {
  createFragment,
  createComment,
  appendChild,
  insertBefore,
  removeBefore,
  previousSibling,
} from '../../dom/'
import {bind} from '../bind'
import render from '../render'

let uid = 0

export default function createTemplate (node, attributes, children, vexil, scope) {
  uid++
  node = createFragment(node)
  attributes && computeAttributes(node, attributes, vexil, scope, (head, newScope, insert, id, lastLength) => {
    if (insert) {
      insertChildrenBefore(head, children, vexil, newScope, id)
    } else {
      let length = 0
      if (children) {
        length += children.length
      }
      if (lastLength) {
        length += lastLength
      }
      children && removeChildrenBefore(head, length, id)
    }
  }, uid)
  return node
}

function computeAttributes (node, attributes, vexil, scope, callback, id) {
  let $if = attributes['*if']
  if ($if) {
    let head = createComment('if')
    appendChild(node, head)
    bind($if, (newVal, oldVal) => {
      newVal = Boolean(newVal)
      callback(head, scope, newVal, id)
    }, vexil, scope)
  }
  let $items = attributes['*for']
  if ($items) {
    let head = createComment('for')
    appendChild(node, head)
    let subKey = attributes['_forKey']
    let lastLength
    bind($items, (newVal, oldVal) => {
      if (lastLength === undefined) {
        lastLength = newVal.length
      }
      newVal.forEach(() => {
        callback(head, null, false, id, lastLength)
      })
      newVal.forEach((v, k) => {
        let newScope = Object.assign({}, scope)
        newScope[subKey] = v
        newScope.$index = k
        callback(head, newScope, true, id)
      })
    }, vexil, scope)
  }
}

function insertChildrenBefore (head, children, vexil, scope, id) {
  let node
  children.forEach(child => {
    node = render(child, vexil, scope)
    node['uid'] = id
    insertBefore(head, node)
  })
}

function removeChildrenBefore (head, length, id) {
  let node
  while (length-- > 0) {
    node = previousSibling(head)
    if (node && node['uid'] === id) {
      removeBefore(head)
    }
  }
}
