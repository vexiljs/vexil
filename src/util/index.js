/**
 * Array type check.
 *
 * @param {*} obj
 * @return {Boolean}
 */

export const isArray = Array.isArray

/**
 * Function type check.
 *
 * @param {*} fun
 * @return {Boolean}
 */

export function isFun (fun) {
  return typeof fun === 'function'
}

/**
 * String type check.
 *
 * @param {*} str
 * @return {Boolean}
 */

export function isStr (fun) {
  return typeof fun === 'string'
}

/**
 * Define a property.
 *
 * @param {Object} object
 * @param {String} property
 * @param {*} value
 * @param {Boolean} [enumerable]
 */

export function def (object, property, value, enumerable) {
  Object.defineProperty(object, property, {
    value,
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  })
}
