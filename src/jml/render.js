import {isArray} from '../util/'
import createTextNode from './node/text'
import createNode from './node/node'
import createTemplate from './node/template'

export default function render (jml, vexil, scope) {
  if (isArray(jml)) {
    if (jml[0] === 'template') {
      return createTemplate(jml[0], jml[1], jml[2], vexil, scope)
    } else {
      return createNode(jml[0], jml[1], jml[2], vexil, scope)
    }
  }
  return createTextNode(jml, vexil, scope)
}
