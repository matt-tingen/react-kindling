function asFunction<F extends Function>(value: F): F
function asFunction<T>(value: T): () => T
function asFunction(value: any) {
  return typeof value === 'function' ? value : () => value
}

export default asFunction
