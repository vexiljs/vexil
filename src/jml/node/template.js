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
import vIf from './if'
import vFor from './for'

let uid = 0

export default function createTemplate (node, attributes, children, vexil, scope) {
  uid++
  node = createFragment(node)
  attributes && computeAttributes(node, attributes, children, vexil, scope, (head, newScope, insert, id, lastLength) => {
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

function computeAttributes (node, attributes, children, vexil, scope, callback, id) {
  let $if = attributes['*if']
  if ($if) {
    let head = createComment('if')
    appendChild(node, head)
    let vNode = vIf(
      head, attributes, children, vexil, scope, uid
    )
    let val = bind($if, vNode.update, vexil, scope)
    vNode.update(val)
  }
  let $for = attributes['*for']
  if ($for) {
    let head = createComment('for')
    appendChild(node, head)
    let vNode = vFor(
      head, attributes, children, vexil, scope, uid
    )
    let val = bind($for, vNode.update, vexil, scope)
    vNode.update(val)
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
