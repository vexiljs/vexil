import VN from '../vn'
import VIf from './if'
import VFor from './for'
import VComponent from './component'
import {createFragment} from '../../dom/'

const DIRCTIVES = {
  '*if': VIf,
  '*for': VFor,
  'component': VComponent,
}
const DIRCTIVE_KEYS = Object.keys(DIRCTIVES)

export const DIRCTIVE_HEADS = {}
DIRCTIVE_KEYS.forEach(key => {
  let name = DIRCTIVES[key].name
  DIRCTIVE_HEADS[name] = key.replace('*', '')
})

export default class VTerminal extends VN {

  /**
   * class VTerminal
   *
   * @param {Array} jml
   * @param {Vexil} vexil
   */

  constructor (...args) {
    super(...args)
    this.node = createFragment()
    if (this.attributes) {
      this.active = true
      generate(this)
    }
  }

  /**
   * method init
   */

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
  $generate(terminal, v || before)
}
