import render from './jml/'
import {
  query,
  appendChild,
} from './dom/'
import ob from 'ob.js'

export default class Vexil {
  constructor (vexil) {
    this.$jml = vexil.$jml
    this.$create = vexil.create
    this.$mount = vexil.mount

    this.$ob = ob(this).reactive(vexil)

    this.render()

    this.$create && this.$create()
  }
  render () {
    this.$dom = render(this).node
  }
  mount (selector) {
    this.$selector = query(selector)
    appendChild(this.$selector, this.$dom)

    this.$mount && this.$mount()
  }
}
