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

export function insertBefore (head, node) {
  return head.parentNode.insertBefore(node, head)
}

export function removeBefore (head) {
  return head.parentNode.removeChild(head.previousSibling)
}

export function removeNodeByHead (head, node) {
  return head.parentNode.removeChild(node)
}

export function createAttribute (attribute) {
  return DOC.createAttribute(attribute)
}

export function getAttribute (attribute) {
  return attribute.nodeValue
}

export function setAttribute (attribute, value) {
  attribute.nodeValue = value
}

export function applyAttribute (node, attribute) {
  node.setAttributeNode(attribute)
}

export function previousSibling (node) {
  return node.previousSibling
}

export const VALUES = {
  text: 'textContent',
  textContent: 'textContent',
  innerText: 'innerText',
  html: 'innerHTML',
  innerHTML: 'innerHTML',
}
