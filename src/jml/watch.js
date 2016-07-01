const WATCH_OPTION = {deep: true}

export default function watch (func, callback, scope, subScope) {
  return scope.$ob.watch(() => {
    return evaluate(func, scope, subScope)
  }, callback, WATCH_OPTION)
}

function evaluate (func, scope, subScope) {
  try {
    return func(scope, subScope)
  } catch (err) {
    return undefined
  }
}
