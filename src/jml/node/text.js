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
    bind(text, (newVal, oldVal) => {
      setAttribute(node, newVal)
    })
  } else {
    setAttribute(node, text)
  }
  return node
}
