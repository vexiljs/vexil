import demo from './demo.vex'
import Vexil from '../src'

window.demo = demo
window.Vexil = Vexil

window.onload = function () {
  let app = new Vexil(demo)
  app.render()
  app.mount('#app')
}
