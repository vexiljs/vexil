export default class Tree {

  /**
   * abstract class Tree
   *
   * @param {Tree} parent
   */

  constructor (parent) {
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
