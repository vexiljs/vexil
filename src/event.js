/**
 * class Event
 *
 * @param {Object} owner
 * @param {Event} [parent]
 * @returns {Event}
 */

let uid = 0

export default class Event {
  constructor (owner, parent) {
    this.uid = uid++
    this.owner = owner
    if (parent) {
      this.parent = parent
      this.root = parent.root
      parent.children.push(this)
    } else {
      this.root = this
      this.parent = null
    }
    this.children = []
    this.subscribers = {}
  }
  on (event, callback) {
    if (this.subscribers[event]) {
      this.subscribers[event] = [callback]
    } else {
      this.subscribers[event].push(callback)
    }
  }
  once (event, callback) {
    const newCallback = () => {
      callback(this)
      this.cancel(event, newCallback)
    }
    this.on(event, newCallback)
  }
  cancel (event, callback) {
    if (!this.subscribers[event]) {
      return
    }
    this.subscribers[event] =
      this.subscribers[event].filter(c => c !== callback)
  }
  emit (event) {
    if (!this.subscribers[event]) {
      return
    }
    this.subscribers[event].forEach(c => c(this))
  }
  broadcast (event) {
    this.children.forEach(c => {
      if (c.emit(event)) {
        c.broadcast(event)
      }
    })
  }
  dispatch (event) {
    if (this.emit(event)) {
      if (this.parent) {
        this.parent.dispatch(event)
      }
    }
  }
}
