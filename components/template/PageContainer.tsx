import React from 'react'
interface Props {
  children
  className?
}
const PageContainer = ({ children, className }: Props) => {
  return (
    <div className={`mx-auto p-4 ${className}`} style={{ maxWidth: '1100PX' }}>
      {children}
    </div>
  )
}

export default PageContainer
