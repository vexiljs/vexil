import VIf from './if'
import VFor from './for'
import {createFragment} from '../../dom/'

let uid = 1

export default class vTerminal {
  constructor (jmlNode, vexil) {
    this.uid = uid++
    this.node = createFragment()
    this.watchers = []
    let attributes = jmlNode[1]
    if (attributes) {
      if (attributes['*if']) {
        this.watchers.push(new VIf(this.node, jmlNode, vexil, uid))
      }
      if (attributes['*for']) {
        this.watchers.push(new VFor(this.node, jmlNode, vexil, uid))
      }
    }
    this.binded = true
  }
  bind () {
    if (this.binded) {
      return
    }
    this.watchers.forEach(v => {
      if (v.bind) {
        v.bind()
      }
    })
    this.binded = true
  }
  unbind () {
    if (!this.binded) {
      return
    }
    this.watchers.forEach(v => {
      if (v.unbind) {
        v.unbind()
      }
    })
    this.binded = false
  }
  destroy () {
    this.watchers.forEach(v => {
      v.destroy()
    })
  }
}
