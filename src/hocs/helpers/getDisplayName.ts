const getDisplayName = (WrappedComponent: React.ComponentType) =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component'

export default getDisplayName
