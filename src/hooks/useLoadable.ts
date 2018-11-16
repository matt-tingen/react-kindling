import { InputIdentityList, useEffect, useState } from 'react'

interface State<T> {
  loading: boolean
  value?: T
  error?: any
}
const initialState: State<any> = {
  loading: true,
}

type LoadingLoadable = [void, { loading: true }]
type LoadedLoadable<T> = [T, { loading: boolean }]
type ErroredLoadable = [void, { loading: boolean; error: any }]

type Loadable<T> = LoadingLoadable | LoadedLoadable<T> | ErroredLoadable

const useLoadable = <T>(
  load: (() => Promise<T>),
  inputs: InputIdentityList,
): Loadable<T> => {
  const [state, setState] = useState<State<T>>(initialState)
  useEffect(() => {
    // If inputs change, the previous state is preserved while loading again.
    setState({ ...state, loading: true })

    load()
      .then(value => {
        setState({ value, loading: false })
      })
      .catch(error => {
        setState({ error, loading: false })
      })
  }, inputs)

  const { value, ...rest } = state
  return [value, rest] as Loadable<T>
}

export default useLoadable
