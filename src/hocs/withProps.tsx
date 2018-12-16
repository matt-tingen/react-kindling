import * as React from 'react'
import Omit from '../types/Omit'

const withProps = <InjectedProps extends {}>(
  displayName: string,
  injectedProps: InjectedProps,
) => <Props extends Partial<InjectedProps>>(
  WrappedComponent: React.ComponentType<Props>,
): React.ComponentType<
  Omit<Props, keyof InjectedProps> & Partial<InjectedProps>
> => {
  const WithProps: React.SFC<any> = props => (
    <WrappedComponent {...injectedProps} {...props} />
  )

  WithProps.displayName = displayName
  return WithProps
}

export default withProps
