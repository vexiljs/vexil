const WATCH_OPTION = {deep: true, first: true}

export function bind (func, callback, scope, subScope) {
  return scope.$ob.watch(() => {
    return evaluate(func, scope, subScope)
  }, callback, WATCH_OPTION).value
}

export function evaluate (func, scope, subScope) {
  try {
    return func(scope, subScope)
  } catch (err) {
    return undefined
  }
}
