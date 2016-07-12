import VC from '../vc'

export default class VIf extends VC {

  /**
   * class VIf
   *
   * @param {VTerminal} terminal
   */

  constructor (terminal) {
    super(terminal)
    this.value = this.attributes['*if']
    this.show = false
    this.nextBinded = false
  }

  /**
   * method update
   *
   * @param {*} newVal
   */

  update (newVal) {
    if (newVal) {
      if (!this.nextBinded) {
        this.next.bind()
        this.nextBinded = true
      }
      this.insertChildren()
      this.show = true
    } else {
      if (!this.show) {
        return
      }
      this.removeChildren()
      this.show = false
    }
  }

  /**
   * method insertChildren
   */

  insertChildren () {
    this.next.insertChildren()
  }

  /**
   * method removeChildren
   */

  removeChildren () {
    this.next.removeChildren()
  }
}
