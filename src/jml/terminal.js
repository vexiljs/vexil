import {createFragment} from '../dom/'
import VIf from './if'
import VFor from './for'

let uid = 1

export default class vTerminal {
  constructor (jmlNode, vexil, scope) {
    this.uid = uid++
    this.node = createFragment()
    this.watchers = null
    let attributes = jmlNode[1]
    if (attributes) {
      this.watchers = []
      if (attributes['*if']) {
        this.watchers.push(new VIf(this.node, jmlNode, vexil, scope, uid))
      }
      if (attributes['*for']) {
        this.watchers.push(new VFor(this.node, jmlNode, vexil, scope, uid))
      }
      this.remove = function remove () {
        this.watchers.forEach(v => {
          if (v.remove) {
            v.remove()
          }
        })
      }
      this.recover = function recover () {
        this.watchers.forEach(v => {
          if (v.recover) {
            v.recover()
          }
        })
      }
    }
  }
  destroy () {
    if (this.watchers) {
      this.watchers.forEach(v => {
        v.destroy && v.destroy()
      })
    }
  }
}
