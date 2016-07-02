import render from '../render'
import {
  appendChild,
  removeChildByParent,
  insertBefore,
  removeNodeByHead,
  createComment,
} from '../../dom/'
import watch from '../watch'

export default class VIf {
  constructor (node, jmlNode, vexil, uid) {
    this.head = createComment('if')
    appendChild(node, this.head)
    this.node = node
    this.vexil = vexil
    this.children = jmlNode[2]
    this.attributes = jmlNode[1]
    this.value = this.attributes['*if']
    this.uid = uid
    this.watcher = watch(this.value, this.update.bind(this), vexil)
    this.vNodes = null
    this.update(this.watcher.value)
  }
  update (newVal) {
    if (newVal) {
      if (!this.vNodes) {
        let vNode
        this.vNodes = this.children.map(child => {
          vNode = render(child, this.vexil)
          vNode['uid'] = this.uid
          return vNode
        })
      }
      this.vNodes.forEach(vNode => {
        if (vNode.recover) {
          vNode.recover()
        }
        insertBefore(this.head, vNode.node)
      })
    } else {
      if (this.vNodes) {
        this.vNodes.forEach(vNode => {
          removeNodeByHead(this.head, vNode.node)
          if (vNode.remove) {
            vNode.remove()
          }
        })
      }
    }
  }
  remove () {
    this.watcher.active = false
    this.update(false)
  }
  recover () {
    this.watcher.active = true
    this.watcher.run()
  }
  destroy () {
    this.update(false)
    this.watcher.teardown()
    removeChildByParent(this.head)
  }
}
