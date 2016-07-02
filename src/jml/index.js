import {def} from '../util'
import render from './render'

export default function (vexil) {
  def(vexil, '_scope', {})
  return render(vexil.$jml, vexil)
}
