import {
  query,
  appendChild,
} from './dom'
import render from './render'

export default class Vexil {
  constructor (vexil) {
    Object.assign(this, vexil)
  }
  render () {
    this.dom = render(this.$jml, this)
  }
  mount (selector) {
    this.root = query(selector)
    appendChild(this.root, this.dom)
  }
}
