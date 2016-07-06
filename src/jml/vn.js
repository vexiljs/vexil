let uid = 0

export default class VN {

  /**
   * class VN
   *
   * @param {Array} jml
   * @param {Vexil} vexil
   */

  constructor (jml, vexil) {
    this.uid = uid++
    this.jml = jml
    this.name = jml[0]
    this.attributes = jml[1]
    this.children = jml[2]
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
