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
  attributes && computeAttributes(node, attributes, vexil, scope, (head, newScope, insert, id) => {
    if (insert) {
      children && insertChildrenBefore(head, children, vexil, newScope, id)
    } else {
      children && removeChildrenBefore(head, children.length, id)
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
  // let $items = attributes['*for']
  // if ($items) {
  //   $items = evaluate($items, vexil, scope)
  //   if ($items && $items.length) {
  //     let newScope = Object.assign({}, scope)
  //     let subKey = attributes['_forKey']
  //     $items.forEach((v, k) => {
  //       newScope[subKey] = v
  //       newScope.$index = k
  //       callback(newScope)
  //     })
  //   }
  // } else {
  //   callback(vexil, scope)
  // }
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
    if (node['uid'] === id) {
      removeBefore(head)
    }
  }
}
