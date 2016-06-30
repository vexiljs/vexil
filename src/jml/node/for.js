import {
  insertBefore,
  removeNodeByHead,
} from '../../dom/'
import render from '../render'

export default function vFor (head, attributes, children, vexil, scope, uid) {
  let subKey = attributes['_forKey']
  let nodes
  function update (newVal, oldVal) {
    if (nodes) {
      nodes.forEach(node => {
        removeNodeByHead(head, node)
      })
    }
    newVal = newVal || []
    nodes = []
    newVal.forEach((v, k) => {
      let newScope = Object.assign({}, scope)
      newScope[subKey] = v
      newScope.$index = k
      let node = make(children[0], vexil, newScope, uid)
      insertBefore(head, node)
      nodes.push(node)
    })
  }
  return {
    update,
  }
}

function make (child, vexil, scope, uid) {
  let node = render(child, vexil, scope)
  node['uid'] = uid
  return node
}
