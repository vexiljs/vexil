import VC from '../vc'
import render from '../render'
import {
  insertBefore,
  removeNodeByHead,
} from '../../dom/'

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
  }

  /**
   * method update
   *
   * @param {*} newVal
   */

  update (newVal) {
    if (newVal) {
      if (!this.insert) {
        if (this.next) {
          this.next.bind()
          this.insert = () => {
            this.next.insert()
          }
          this.remove = () => {
            this.next.remove()
          }
        } else {
          if (!this.vNodes) {
            let vNode
            this.vNodes = this.childNodes.map(child => {
              vNode = render(child, this.vexil)
              return vNode
            })
          }
          this.insert = () => {
            this.vNodes.forEach(vNode => {
              vNode.suspend()
              insertBefore(this.head, vNode.node)
            })
          }
          this.remove = () => {
            if (this.vNodes) {
              this.vNodes.forEach(vNode => {
                removeNodeByHead(this.head, vNode.node)
                vNode.resume()
              })
            }
          }
        }
      }
      this.insert()
      this.show = true
    } else {
      if (!this.show) {
        return
      }
      this.remove()
      this.show = false
    }
  }
}
