import {
  query,
  appendChild,
} from './dom/'
import render from './jml/'
import ob from 'ob.js'

export default class Vexil {
  constructor (vexil) {
    this.$jml = vexil.$jml
    this.$created = vexil.created
    this.$mounted = vexil.mounted

    this.$ob = ob(this).reactive(vexil)

    this.render()

    this.$created && this.$created()
  }
  render () {
    this.$dom = render(this).node
  }
  mount (selector) {
    this.$domRoot = query(selector)
    appendChild(this.$domRoot, this.$dom)

    this.$mounted && this.$mounted()
  }
}
