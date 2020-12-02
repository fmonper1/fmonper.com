import React from 'react'

interface Props {
  size: number
  className?: string
  children: any
  props?: any
  color?: any
}

const Title = ({ size, className, children, color, ...props }: Props) => {
  const baseCss = `${color ?? 'text-primary-main'} `
  switch (size) {
    case 1:
      return (
        <h1 className={`text-3xl font-bold ${className} ${baseCss}`} {...props}>
          {children}
        </h1>
      )
    case 2:
      return (
        <h2 className={`text-2xl font-bold ${className} ${baseCss}`} {...props}>
          {children}
        </h2>
      )
    case 3:
      return (
        <h3 className={`text-xl ${className} ${baseCss}`} {...props}>
          {children}
        </h3>
      )
    case 4:
      return (
        <h4 className={`text-md ${className} ${baseCss}`} {...props}>
          {children}
        </h4>
      )
    default:
      break
  }
}

export default Title
