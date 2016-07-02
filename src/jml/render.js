import {isArray} from '../util/'

import VText from './text'
import VNode from './node'
import VTerminal from './terminal'

export default function render (jml, vexil) {
  if (isArray(jml)) {
    if (jml[0] === 'template') {
      return new VTerminal(jml, vexil)
    } else {
      return new VNode(jml, vexil)
    }
  }
  return new VText(jml, vexil)
}
