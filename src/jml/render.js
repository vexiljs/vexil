import {isArray} from '../util/'

import VText from './text'
import VNode from './node'
import VTerminal from './terminal'

export default function render (jml, vexil, scope) {
  if (isArray(jml)) {
    if (jml[0] === 'template') {
      return new VTerminal(jml, vexil, scope)
    } else {
      return new VNode(jml, vexil, scope)
    }
  }
  return new VText(jml, vexil, scope)
}
