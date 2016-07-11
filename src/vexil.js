import Tree from './tree'
import render from './jml/'
import {
  query,
  appendChild,
} from './dom/'
import ob from './ob'
import {isStr} from './util/'

export default class Vexil extends Tree {

  /**
   * class Vexil
   *
   * @param {Object} vexil
   * @param {Vexil} [parent]
   */

  constructor (vexil, parent) {
    super(parent)
    this.$jml = vexil.$jml
    this.$create = vexil.create
    this.$mount = vexil.mount
    this.$components = vexil.components || {}

    this.$ob = ob(this).reactive(vexil)

    this.render()

    this.$create && this.$create()
  }

  /**
   * method render
   */

  render () {
    this.$vdom = render(this)
    this.$dom = this.$vdom.node
  }

  /**
   * method mount
   *
   * @param {String|Element} selector
   */

  mount (selector) {
    if (isStr(selector)) {
      selector = query(selector)
    }
    this.$selector = selector
    appendChild(this.$selector, this.$dom)

    this.$mount && this.$mount()
  }
}
