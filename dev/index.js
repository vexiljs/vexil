import demo from './demo.vex'
import Vexil from '../src'

window.demo = demo
window.Vexil = Vexil

window.onload = function () {
  let app = new Vexil(demo)
  app.mount('#app')
  window.app = app
}
