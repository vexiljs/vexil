import {evaluate} from './watch'
import {listen} from '../dom/event'

export default function vEvent (node, name, callback, vexil) {
  listen(node, name, event => {
    vexil._scope.$event = event
    evaluate(callback, vexil)
  })
}
