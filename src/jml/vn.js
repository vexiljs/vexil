/**
 * class VN
 *
 * @param {Array} jml
 * @param {Vexil} vexil
 * @returns {VN}
 */

let uid = 0

export default class VN {
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
  bind () {
    if (!this.binded) {
      this.watchers.forEach(v => v.bind())
      this.binded = true
    }
  }
  unbind () {
    if (this.binded) {
      this.watchers.forEach(v => v.unbind())
      this.binded = false
    }
  }
  destroy () {
    this.watchers.forEach(v => v.destroy())
  }
}
