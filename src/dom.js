const DOC = window.document

export function query (selector) {
  return DOC.querySelector(selector)
}

export function createElement (tagName) {
  return DOC.createElement(tagName)
}

export function createText (text) {
  return DOC.createTextNode(text)
}

export function createComment (text) {
  return DOC.createComment(text)
}

export function createFragment () {
  return DOC.createDocumentFragment()
}

export function appendChild (node, child) {
  node.appendChild(child)
}

export function createAttribute (attribute) {
  return DOC.createAttribute(attribute)
}

export function setAttribute (attribute, value) {
  attribute.nodeValue = value
}

export function applyAttribute (node, attribute) {
  node.setAttributeNode(attribute)
}

export const VALUES = {
  text: 'textContent',
  textContent: 'textContent',
  innerText: 'innerText',
  html: 'innerHTML',
  innerHTML: 'innerHTML',
}
