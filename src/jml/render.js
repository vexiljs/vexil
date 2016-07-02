import VNode from './node/'
import VTerminal from './terminal/'
import VText from './node/text'
import {isArray} from '../util/'

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
