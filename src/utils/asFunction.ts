const asFunction = <Args extends any[], R>(
  value: ((...args: Args) => R) | R,
): ((...args: Args) => R) => {
  return typeof value === 'function' ? value : () => value
}

export default asFunction
