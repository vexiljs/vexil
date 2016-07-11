import VN from '../vn'
import VIf from './if'
import VFor from './for'
import VComponent from './component'
import render from '../render'
import {
  createFragment,
  insertBefore,
  removeNodeByHead,
} from '../../dom/'

const COMMANDS = {
  '*if': VIf,
  '*for': VFor,
  'component': VComponent,
}
const COMMAND_KEYS = Object.keys(COMMANDS).reverse()

export const COMMAND_HEADS = {}
COMMAND_KEYS.forEach(key => {
  let name = COMMANDS[key].name
  COMMAND_HEADS[name] = key.replace('*', '')
})

export default class VTerminal extends VN {

  /**
   * class VTerminal
   *
   * @param {Array} jml
   * @param {Vexil} vexil
   * @param {VN} [parent]
   */

  constructor (jml, vexil, parent) {
    super(jml, vexil, parent)
    this.node = createFragment()
    if (this.attributes) {
      let command = this._generate()
      command.bind()
      this.active = true
    }
  }

  /**
   * method generate
   *
   * @private
   * @returns {VC|VN} command
   */

  _generate () {
    let command = this
    let value, cmd, Cmd
    COMMAND_KEYS.forEach(key => {
      value = this.attributes[key]
      if (value) {
        Cmd = COMMANDS[key]
        cmd = new Cmd(this)
        cmd.next = command
        command = cmd
      }
    })
    return command
  }

  /**
   * method bind
   */

  bind () {
    let vNode
    this.children = this.childNodes.map(child => {
      vNode = render(child, this.vexil)
      return vNode
    })
  }

  /**
   * method insert
   */

  insert (head) {
    this.children.forEach(vNode => {
      vNode.suspend()
      insertBefore(head, vNode.node)
    })
  }

  /**
   * method remove
   */

  remove (head) {
    this.children.forEach(vNode => {
      removeNodeByHead(head, vNode.node)
      vNode.resume()
    })
  }
}
