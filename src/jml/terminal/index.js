import VN from '../vn'
import VIf from './if'
import VFor from './for'
import {createFragment} from '../../dom/'

let uid = 1

export default class vTerminal extends VN {
  constructor (jmlNode, vexil) {
    super()
    this.uid = uid++
    this.node = createFragment()
    let attributes = jmlNode[1]
    if (attributes) {
      if (attributes['*if']) {
        this.watchers.push(new VIf(this.node, jmlNode, vexil, uid))
      }
      if (attributes['*for']) {
        this.watchers.push(new VFor(this.node, jmlNode, vexil, uid))
      }
    }
  }
}
