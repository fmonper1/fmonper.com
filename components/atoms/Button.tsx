import React from 'react'
import Link from 'next/link'

interface Props {
  children
  className?
  link?
  size?: 'lg' | 'xl'
  style?: 'link' | 'primary'
  [props: string]: any
}

const Button = ({
  children,
  size,
  link = false,
  style,
  className,
  ...props
}: Props) => {
  let classes = ''
  if (size === 'lg') {
    classes = classes + ' p-4 text-xl'
  } else if (size === 'xl') {
    classes = classes + 'p-6 text-xl'
  }

  if (style === 'link') {
    classes =
      classes +
      ' bg-transparent hover:bg-white hover:bg-primary-main text-secondary-main'
  } else if (style === 'primary') {
    classes = classes + ' bg-primary-main hover:bg-primary-light text-white'
  } else {
    classes = classes + ' bg-secondary-main hover:bg-secondary-light text-black'
  }

  const defaultClasses = `${className} rounded-md transition duration-100 p-2 font-bold ${classes}`
  if (link) {
    return (
      <Link href={props.href}>
        <a className={defaultClasses + ' inline-block'} {...props}>
          {children}
        </a>
      </Link>
    )
  }
  return (
    <button className={defaultClasses} {...props}>
      {children}
    </button>
  )
}

export default Button
