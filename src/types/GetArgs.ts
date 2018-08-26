type GetArgs<T> = T extends (...args: infer Args) => any ? Args : never

export default GetArgs
