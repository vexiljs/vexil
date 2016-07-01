import {
  appendChild,
  insertBefore,
  removeNodeByHead,
  createComment,
} from '../dom/'
import render from './render'
import watch from './watch'

export default class VFor {
  constructor (node, jmlNode, vexil, scope, uid) {
    this.head = createComment('for')
    appendChild(node, this.head)
    this.node = node
    this.vexil = vexil
    this.scope = scope
    this.variable = jmlNode[1]['_forKey']
    this.value = jmlNode[1]['*for']
    this.child = jmlNode[2][0]
    this.uid = uid
    this.watcher = watch(this.value, this.update.bind(this), vexil, scope)
    this.vNodes = null
    this.update(this.watcher.value)
  }
  update (array) {
    if (this.vNodes) {
      this.vNodes.forEach(vNode => {
        removeNodeByHead(this.head, vNode.node)
        vNode.destroy()
      })
      this.vNodes = null
    }
    if (!array || !array.length) {
      this.vNodes = null
      return
    }
    this.vNodes = []
    array.forEach((v, k) => {
      let newScope = Object.assign({}, this.scope)
      newScope[this.variable] = v
      newScope.$index = k
      let vNode = render(this.child, this.vexil, newScope)
      vNode.uid = this.uid
      insertBefore(this.head, vNode.node)
      this.vNodes.push(vNode)
    })
  }
  remove () {
    this.watcher.active = false
    this.update(null)
  }
  recover () {
    this.watcher.active = true
    this.watcher.run()
  }
  destroy () {
    this.update(null)
    this.watcher.teardown()
  }
}
