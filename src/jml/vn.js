export default class VN {
  constructor () {
    this.binded = true
    this.watchers = []
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
