import VN from '../vn'
import VIf from './if'
import VFor from './for'
import {
  createFragment,
  createComment,
  appendChild,
} from '../../dom/'

const DIRCTIVES = {
  '*if': VIf,
  '*for': VFor,
}
const DIRCTIVE_KEYS = Object.keys(DIRCTIVES)

let uid = 1

export default class vTerminal extends VN {
  constructor (jmlNode, vexil) {
    super()
    this.uid = uid++
    this.node = createFragment()
    let attributes = jmlNode[1]
    if (attributes) {
      this.index = 0
      this.jmlNode = jmlNode
      this.vexil = vexil
      this.next()
      this.init()
    }
  }
  next (before) {
    let key = DIRCTIVE_KEYS[this.index]
    let V = DIRCTIVES[key]
    if (V) {
      let v = new V(this.jmlNode, this.vexil)
      v.head = createComment(key.slice(1))
      appendChild(this.node, v.head)
      if (before) {
        v.before = before
        before.next = v
      }
      this.watchers.push(v)
      this.index++
      this.next(v)
    }
  }
  init () {
    if (this.watchers[0]) {
      this.watchers[0].init()
    }
  }
}
