import Tree from '../tree'

export default class VN extends Tree {

  /**
   * abstract class VN
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
    this.children = []
    this.sleeping = false
    this.active = false
  }

  /**
   * method suspend
   */

  suspend () {
    if (!this.sleeping) {
      this.watchers.forEach(v => v.suspend())
      this.sleeping = true
    }
  }

  /**
   * method resume
   */

  resume () {
    if (this.sleeping) {
      this.watchers.forEach(v => v.resume())
      this.sleeping = false
    }
  }

  /**
   * method unbind
   */

  unbind () {
    if (this.active) {
      this.active = false
      this.watchers.forEach(v => v.unbind())
    }
  }
}
