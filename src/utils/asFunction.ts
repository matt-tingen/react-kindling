const asFunction = <T>(value: T) =>
  typeof value === 'function' ? value : () => value

export default asFunction
