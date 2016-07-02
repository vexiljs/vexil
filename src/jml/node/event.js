import {listen} from '../../dom/event'
import {evaluate} from '../watch'

export default function vEvent (node, name, callback, vexil) {
  listen(node, name, event => {
    vexil._scope.$event = event
    evaluate(callback, vexil)
  })
}
