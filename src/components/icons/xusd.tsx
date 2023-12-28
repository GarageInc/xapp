import * as React from 'react'
import { useTheme } from 'styled-components'
import { ThemeColors } from 'theme/styled'

function Icon(props: React.SVGProps<SVGSVGElement> & { color?: ThemeColors }, svgRef?: React.Ref<SVGSVGElement>) {
  const theme = useTheme()

  const color = props.color && (theme as any)[props.color] ? theme[props.color] : theme.fuchsia

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="18"
      viewBox="0 0 16 18"
      fill="none"
      ref={svgRef}
      {...props}
    >
      <path d="M1.33398 8V1H6.00065V4.66667" stroke={color} strokeLinecap="round" />
      <path d="M1.33398 17V10.3333L10.0007 5.66667V1H14.6673V7.66667L6.00065 12.3333V17H1.33398Z" stroke={color} />
      <path d="M10 13.6663V16.9997H14.6667V10.333" stroke={color} strokeLinecap="round" />
    </svg>
  )
}

const ForwardRef = React.forwardRef(Icon)
const MemoForwardRef = React.memo(ForwardRef)

export default MemoForwardRef
