import React from 'react'
import Title from '../atoms/Title'
import Divider from '../atoms/Divider'

interface Props {
  title?
  children
  extra?
  withDivider?: boolean
  [props: string]: any
}

const Card = ({
  title,
  children,
  extra,
  withDivider = false,
  ...props
}: Props) => {
  return (
    <div className="bg-white rounded-md p-4 transition duration-200 shadow-lg hover:shadow-xl  border-1 w-full space-y-4">
      {(title || extra) && (
        <div className="flex flex-wrap">
          <Title size={2} className="flex-grow">
            {title}
          </Title>
          <div>{extra}</div>
        </div>
      )}
      {withDivider && <Divider />}

      <div>{children}</div>
    </div>
  )
}

export default Card
