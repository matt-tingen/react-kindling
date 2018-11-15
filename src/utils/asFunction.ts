type FunctionOf<Args extends any[], R> = (...args: Args) => R

export type MaybeFunction<Value, Args extends any[]> =
  | Value
  | FunctionOf<Args, Value>

const asFunction = <Args extends any[], R>(
  value: MaybeFunction<R, Args>,
): FunctionOf<Args, R> => {
  return typeof value === 'function'
    ? (value as FunctionOf<Args, R>) // R must not itself be a function
    : () => value
}

export default asFunction
