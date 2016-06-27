import {
  createFragment,
  createComment,
  appendChild,
  insertBefore,
  removeBefore,
} from '../../dom/'
import {bind} from '../bind'
import render from '../render'

export default function createTemplate (node, attributes, children, vexil, scope) {
  node = createFragment(node)
  let head = createComment('template')
  appendChild(node, head)
  attributes && computeAttributes(attributes, vexil, scope, (newScope, insert) => {
    if (insert) {
      children && insertChildrenBefore(head, children, vexil, newScope)
    } else {
      children && removeChildrenBefore(head, children.length)
    }
  })
  return node
}

function computeAttributes (attributes, vexil, scope, callback) {
  let $if = attributes['*if']
  if ($if) {
    bind($if, (newVal, oldVal) => {
      newVal = !!newVal
      callback(scope, newVal)
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

function insertChildrenBefore (head, children, vexil, scope) {
  children.forEach(child => {
    insertBefore(head, render(child, vexil, scope))
  })
}

function removeChildrenBefore (head, length) {
  while (length-- > 0) {
    removeBefore(head)
  }
}
