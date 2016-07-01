import {
  createText,
  setAttribute,
} from '../../dom/'
import {
  bind,
} from '../bind'

export default function createTextNode (text, vexil, scope) {
  let node = createText('')
  if (typeof text === 'function') {
    let text = bind(text, (newVal, oldVal) => {
      setAttribute(node, newVal)
    })
  }
  setAttribute(node, text)
  return node
}
