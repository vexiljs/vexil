let uid = 0

export default class Tree {

  /**
   * class Tree
   *
   * @param {Tree} parent
   */

  constructor (parent) {
    this.uid = uid++
    if (parent) {
      this.parent = parent
      this.root = parent.root
      parent.children.push(this)
    } else {
      this.parent = null
      this.root = this
    }
    this.children = []
  }
}
