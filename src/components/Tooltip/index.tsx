import { ReactNode, useCallback, useState } from 'react'
import styled from 'styled-components'

import Popover, { PopoverProps } from '../Popover'

const TooltipContainer = styled.div`
  padding: 8px;
  word-break: break-word;
  max-width: 220px;
`

interface TooltipProps extends Omit<PopoverProps, 'content'> {
  text: ReactNode
  hidden?: boolean
}

interface TooltipContentProps extends Omit<PopoverProps, 'content'> {
  content: ReactNode
}

function Tooltip({ text, ...rest }: TooltipProps) {
  return <Popover content={<TooltipContainer>{text}</TooltipContainer>} {...rest} />
}

function TooltipContent({ content, ...rest }: TooltipContentProps) {
  return <Popover content={<TooltipContainer>{content}</TooltipContainer>} {...rest} />
}

export function MouseoverTooltip({
  children,
  noPadding,
  ...rest
}: Omit<TooltipProps, 'show'> & {
  noPadding?: boolean
}) {
  const [show, setShow] = useState(false)
  const open = useCallback(() => setShow(true), [setShow])
  const close = useCallback(() => setShow(false), [setShow])

  return (
    <Tooltip {...rest} show={show && !!rest.text}>
      <div
        className={rest.className}
        onMouseEnter={open}
        onMouseLeave={close}
        style={{ display: 'inline-block', lineHeight: 0, padding: noPadding ? '0' : '0.25rem' }}
      >
        {children}
      </div>
    </Tooltip>
  )
}

interface IMouseOverTooltipContent extends Omit<TooltipContentProps, 'show'> {
  show: boolean
  open?: () => void
  close?: () => void
}

function MouseoverTooltipContent({ show, close, open, content, children, ...rest }: IMouseOverTooltipContent) {
  return (
    <TooltipContent {...rest} show={show} content={content}>
      <div
        style={{ display: 'inline-block', lineHeight: 0, padding: '0.25rem' }}
        onMouseEnter={open}
        onMouseLeave={close}
        onMouseOut={close}
      >
        {children}
      </div>
    </TooltipContent>
  )
}
