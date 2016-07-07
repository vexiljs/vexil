import Tree from '../tree'

export default class VN extends Tree {

  /**
   * class VN
   *
   * @param {Array} jml
   * @param {Vexil} vexil
   * @param {VN} [parent]
   */

  constructor (jml, vexil, parent) {
    super(parent)
    this.jml = jml
    this.name = jml[0]
    this.attributes = jml[1]
    this.childNodes = jml[2]
    this.vexil = vexil
    this.watchers = []
    this.binded = true
  }

  /**
   * method bind
   */

  bind () {
    if (!this.binded) {
      this.watchers.forEach(v => v.bind())
      this.binded = true
    }
  }

  /**
   * method unbind
   */

  unbind () {
    if (this.binded) {
      this.watchers.forEach(v => v.unbind())
      this.binded = false
    }
  }

  /**
   * method destroy
   */

  destroy () {
    this.watchers.forEach(v => v.destroy())
  }
}
