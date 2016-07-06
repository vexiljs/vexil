import Tree from './tree'

export default class Event extends Tree {

  /**
   * class Event
   *
   * @param {Event} [parent]
   */

  constructor (parent) {
    super(parent)
    this.subscribers = {}
  }

  /**
   * method on
   *
   * @param {String} event
   * @param {Function} callback
   */

  on (event, callback) {
    if (this.subscribers[event]) {
      this.subscribers[event] = [callback]
    } else {
      this.subscribers[event].push(callback)
    }
  }

  /**
   * method once
   *
   * @param {String} event
   * @param {Function} callback
   */

  once (event, callback) {
    const newCallback = () => {
      callback(this)
      this.cancel(event, newCallback)
    }
    this.on(event, newCallback)
  }

  /**
   * method cancel
   *
   * @param {String} event
   * @param {Function} callback
   */

  cancel (event, callback) {
    if (!this.subscribers[event]) {
      return
    }
    this.subscribers[event] =
      this.subscribers[event].filter(c => c !== callback)
  }

  /**
   * method emit
   *
   * @param {String} event
   */

  emit (event) {
    if (!this.subscribers[event]) {
      return
    }
    this.subscribers[event].forEach(c => c(this))
  }

  /**
   * method broadcast
   *
   * @param {String} event
   */

  broadcast (event) {
    this.children.forEach(c => {
      if (c.emit(event)) {
        c.broadcast(event)
      }
    })
  }

  /**
   * method dispatch
   *
   * @param {String} event
   */

  dispatch (event) {
    if (this.emit(event)) {
      if (this.parent) {
        this.parent.dispatch(event)
      }
    }
  }
}
