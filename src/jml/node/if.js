import {
  insertBefore,
  removeNodeByHead,
} from '../../dom/'
import render from '../render'

export default function vIf (head, attributes, children, vexil, scope, uid) {
  let nodes
  function update (newVal, oldVal) {
    newVal = Boolean(newVal)
    if (newVal) {
      if (!nodes) {
        nodes = make(children, vexil, scope, uid)
      }
      append(head, nodes)
    } else {
      remove(head, nodes)
    }
  }
  return {
    update,
  }
}

function make (children, vexil, scope, uid) {
  let node
  return children.map(child => {
    node = render(child, vexil, scope)
    node['uid'] = uid
    return node
  })
}

function append (head, childNodes) {
  childNodes.forEach(child => {
    insertBefore(head, child)
  })
}

function remove (head, childNodes) {
  childNodes.forEach(child => {
    removeNodeByHead(head, child)
  })
}
