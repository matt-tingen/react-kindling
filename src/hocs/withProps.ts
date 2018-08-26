import { ComponentType as Component } from 'react'
import { withProps } from 'recompose'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

// The provided types for withProps are incorrect. Using module augmentation
// causes withProps to be overloaded rather than replaced. Instead, the function
// is re-exported here with better types.
type WithProps = <TInjected>(
  props: TInjected,
) => <P extends Partial<TInjected>>(
  component: Component<P>,
) => Component<Omit<P, keyof TInjected>>

export default withProps as WithProps
