const WATCH_OPTION = {deep: true}

export default function watch (func, callback, vexil, option) {
  return vexil.$ob.watch(() => {
    return evaluate(func, vexil)
  }, callback, option || WATCH_OPTION)
}

export function evaluate (func, vexil) {
  try {
    return func(vexil, vexil._scope)
  } catch (err) {
    return undefined
  }
}
