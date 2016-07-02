import render from './render'
import {def} from '../util'

export default function (vexil) {
  def(vexil, '_scope', {})
  return render(vexil.$jml, vexil)
}
