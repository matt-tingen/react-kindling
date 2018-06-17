const asFunction = value => (typeof value === 'function' ? value : () => value)

export default asFunction
