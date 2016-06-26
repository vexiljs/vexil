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

export default function render (jml, scope, sub) {
  let res
  if (!jml) {
    res = ''
  } else if (isArray(jml)) {
    let [node, attributes, children] = jml
    if (node === 'template') {
      node = createFragment(node)
      attributes && computeAttributes(attributes, scope, sub, (newSub) => {
        children && appendChildren(node, children, scope, newSub)
      })
    } else {
      node = createElement(node)
      attributes && applyAttributes(node, attributes, scope, sub)
      children && appendChildren(node, children, scope, sub)
    }
    return node
  } else if (typeof jml === 'function') {
    res = evaluate(jml, scope, sub)
  } else {
    res = jml
  }
  return createText(res)
}

function applyAttributes (node, attributes, scope, sub) {
  let attr, prop, val
  Object.keys(attributes).forEach(key => {
    if (key[0] === '@') { // event
      node.addEventListener(key.slice(1), (event) => {
        sub.$event = event
        evaluate(attributes[key], scope, sub)
      })
    } else {
      prop = VALUES[key]
      if (prop) {
        val = attributes[key]
        if (typeof val === 'function') {
          val = evaluate(val, scope, sub)
        }
        node[prop] = val
      } else {
        attr = createAttribute(key)
        val = attributes[key]
        if (typeof val === 'function') {
          val = evaluate(val, scope, sub)
        }
        setAttribute(attr, val)
        applyAttribute(node, attr)
      }
    }
  })
}

function computeAttributes (attributes, scope, sub, callback) {
  let $if = attributes['*if']
  if ($if) {
    $if = evaluate($if, scope, sub)
    if (!$if) return
  }
  let $items = attributes['*for']
  if ($items) {
    $items = evaluate($items, scope, sub)
    if ($items && $items.length) {
      let newSub = Object.assign({}, sub)
      let subKey = attributes['_forKey']
      $items.forEach((v, k) => {
        newSub[subKey] = v
        newSub.$index = k
        callback(newSub)
      })
    }
  } else {
    callback(scope, sub)
  }
}

function appendChildren (node, children, scope, sub) {
  children.forEach(child => {
    appendChild(node, render(child, scope, sub))
  })
}

function evaluate (func, scope, sub) {
  try {
    return func(scope, sub)
  } catch (err) {
    return undefined
  }
}
