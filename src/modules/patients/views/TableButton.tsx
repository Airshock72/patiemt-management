import { Button, Tooltip } from 'antd'
import { ReactNode } from 'react'

interface TableButtonProps {
    handleClick: () => void
    danger?: boolean
    title: string
    className?: string
    icon: ReactNode
}

const TableButton = (
  { handleClick, danger, title, className, icon }: TableButtonProps
) => {
  return (
    <Tooltip title={title} placement='top'>
      <Button
        type='link'
        danger={danger}
        onClick={handleClick}
        icon={icon}
        className={className}
      />
    </Tooltip>
  )
}

export default TableButton
