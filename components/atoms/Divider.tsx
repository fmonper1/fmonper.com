import React from 'react'

interface Props {
  className?
}

const Divider = ({ className }: Props) => {
  return <div className={`w-12 h-1 bg-secondary-main ${className}`} />
}

export default Divider
