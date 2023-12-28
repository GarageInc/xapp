import * as React from 'react'
import { useTheme } from 'styled-components'
import { ThemeColors } from 'theme/styled'

function Icon(props: React.SVGProps<SVGSVGElement> & { color?: ThemeColors }, svgRef?: React.Ref<SVGSVGElement>) {
  const theme = useTheme()

  const color = props.color && (theme as any)[props.color] ? theme[props.color] : theme.fuchsia

  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 4.75V4.15258e-07L9.5 0V4.74813C9.49898 2.12563 7.37273 4.15258e-07 4.75 4.15258e-07H2.07629e-07V9.5H4.75C2.12665 9.5 -1.14671e-07 11.6267 0 14.25L2.07629e-07 19H9.5V14.25C9.5 16.8733 11.6267 19 14.25 19H19V9.5H14.2519C16.8744 9.49898 19 7.37273 19 4.75Z"
        fill={color}
      />
    </svg>
  )
}

const ForwardRef = React.forwardRef(Icon)
const MemoForwardRef = React.memo(ForwardRef)

export default MemoForwardRef
