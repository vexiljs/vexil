import {
  createElement,
  createText,
  createFragment,
  appendChild,
  createAttribute,
  setAttribute,
  applyAttribute,
  VALUES,
} from '../dom/'
import {isArray} from '../util/'

export default function render (jml, vexil, scope) {
  let res
  if (!jml) {
    res = ''
  } else if (isArray(jml)) {
    let [node, attributes, children] = jml
    if (node === 'template') {
      node = createFragment(node)
      attributes && computeAttributes(attributes, vexil, scope, (newScope) => {
        children && appendChildren(node, children, vexil, newScope)
      })
    } else {
      node = createElement(node)
      attributes && applyAttributes(node, attributes, vexil, scope)
      children && appendChildren(node, children, vexil, scope)
    }
    return node
  } else if (typeof jml === 'function') {
    res = evaluate(jml, vexil, scope)
  } else {
    res = jml
  }
  return createText(res)
}

function applyAttributes (node, attributes, vexil, scope) {
  let attr
  Object.keys(attributes).forEach(key => {
    if (key[0] === '@') { // event
      node.addEventListener(key.slice(1), (event) => {
        scope.$event = event
        evaluate(attributes[key], vexil, scope)
      })
    } else {
      let val = attributes[key]
      let prop = VALUES[key]
      if (prop) {
        if (typeof val === 'function') {
          node[prop] = bind(val, (newVal, oldVal) => {
            node[prop] = newVal
          }, vexil, scope)
        } else {
          node[prop] = val
        }
      } else {
        attr = createAttribute(key)
        if (typeof val === 'function') {
          setAttribute(attr, bind(val, (newVal, oldVal) => {
            setAttribute(attr, newVal)
            applyAttribute(node, attr)
          }, vexil, scope))
        } else {
          setAttribute(attr, val)
        }
        applyAttribute(node, attr)
      }
    }
  })
}

function computeAttributes (attributes, vexil, scope, callback) {
  let $if = attributes['*if']
  if ($if) {
    $if = evaluate($if, vexil, scope)
    if (!$if) return
  }
  let $items = attributes['*for']
  if ($items) {
    $items = evaluate($items, vexil, scope)
    if ($items && $items.length) {
      let newScope = Object.assign({}, scope)
      let subKey = attributes['_forKey']
      $items.forEach((v, k) => {
        newScope[subKey] = v
        newScope.$index = k
        callback(newScope)
      })
    }
  } else {
    callback(vexil, scope)
  }
}

function appendChildren (node, children, vexil, scope) {
  children.forEach(child => {
    appendChild(node, render(child, vexil, scope))
  })
}

function evaluate (func, scope, subScope) {
  try {
    return func(scope, subScope)
  } catch (err) {
    return undefined
  }
}

const WATCH_OPTION = {deep: true}
function bind (func, callback, scope, subScope) {
  return scope.$ob.watch(() => {
    return evaluate(func, scope, subScope)
  }, callback, WATCH_OPTION).value
}
