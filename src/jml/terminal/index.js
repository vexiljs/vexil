import VN from '../vn'
import VIf from './if'
import VFor from './for'
import {createFragment} from '../../dom/'

const DIRCTIVES = {
  '*if': VIf,
  '*for': VFor,
}
const DIRCTIVE_KEYS = Object.keys(DIRCTIVES)

export const DIRCTIVE_HEADS = {}
DIRCTIVE_KEYS.forEach(key => {
  let name = DIRCTIVES[key].name
  DIRCTIVE_HEADS[name] = key.slice(1)
})

let uid = 1

export default class VTerminal extends VN {
  constructor (jmlNode, vexil) {
    super()
    this.uid = uid++
    this.node = createFragment()
    this.attributes = jmlNode[1]
    if (this.attributes) {
      this.jmlNode = jmlNode
      this.vexil = vexil
      generate(this)
    }
  }
  init () {
    if (this.watchers[0]) {
      this.watchers[0].init()
    }
  }
}

let index

function generate (terminal) {
  index = 0
  $generate(terminal)
  terminal.init()
}

function $generate (terminal, before) {
  let key = DIRCTIVE_KEYS[index]
  if (!key) {
    return
  }
  let v
  if (terminal.attributes[key]) {
    v = new DIRCTIVES[key](terminal)
    if (before) {
      v.before = before
      before.next = v
    }
  }
  index++
  $generate(terminal, v)
}
