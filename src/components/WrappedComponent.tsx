import React from 'react'

type TWrappedComponentProps = {
  WrapperComponent: React.ComponentType<{ children: React.ReactNode }>
  children: React.ReactNode
  wrapperProps?: Record<string, unknown>
}

const WrappedComponent = ({
  WrapperComponent,
  children,
  wrapperProps = {}
}: TWrappedComponentProps) => {
  return (
    <WrapperComponent {...wrapperProps}>
      {children}
    </WrapperComponent>
  )
}
export default WrappedComponent