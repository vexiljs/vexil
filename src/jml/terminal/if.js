import render from '../render'
import {
  removeChildByParent,
  insertBefore,
  removeNodeByHead,
} from '../../dom/'
import watch from '../watch'

export default class VIf {
  constructor (jmlNode, vexil) {
    this.vexil = vexil
    this.children = jmlNode[2]
    this.attributes = jmlNode[1]
    this.value = this.attributes['*if']
    this.vNodes = null
    this.show = false
  }
  init () {
    this.watcher = watch(this.value, this.update.bind(this), this.vexil)
    this.update(this.watcher.value)
  }
  update (newVal) {
    if (newVal) {
      if (!this.insert) {
        if (this.next) {
          this.next.init()
          this.insert = () => {
            this.next.insert()
          }
          this.remove = () => {
            this.next.remove()
          }
        } else {
          if (!this.vNodes) {
            let vNode
            this.vNodes = this.children.map(child => {
              vNode = render(child, this.vexil)
              return vNode
            })
          }
          this.insert = () => {
            this.vNodes.forEach(vNode => {
              vNode.bind()
              insertBefore(this.head, vNode.node)
            })
          }
          this.remove = () => {
            if (this.vNodes) {
              this.vNodes.forEach(vNode => {
                removeNodeByHead(this.head, vNode.node)
                vNode.unbind()
              })
            }
          }
        }
      }
      this.insert()
      this.show = true
    } else {
      if (!this.show) {
        return
      }
      this.remove()
      this.show = false
    }
  }
  bind () {
    this.watcher.active = true
    this.watcher.run()
  }
  unbind () {
    this.watcher.active = false
    this.update(false)
  }
  destroy () {
    this.update(false)
    this.watcher.teardown()
    removeChildByParent(this.head)
  }
}
