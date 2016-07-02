export function listen (node, name, callback, capture) {
  node.addEventListener(name, callback, Boolean(capture))
}
