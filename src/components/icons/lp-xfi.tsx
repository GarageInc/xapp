import * as React from 'react'
import { useTheme } from 'styled-components'
import { ThemeColors } from 'theme/styled'

function Icon(props: React.SVGProps<SVGSVGElement> & { color?: ThemeColors }, svgRef?: React.Ref<SVGSVGElement>) {
  const theme = useTheme()

  const color = props.color && (theme as any)[props.color] ? theme[props.color] : theme.fuchsia

  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.55714 0H0.557143V4C0.557143 6.03696 2.07973 7.7183 4.04888 7.96802C2.05212 8.19216 0.5 9.88624 0.5 11.9429L0.5 15.9429H4.5C6.53696 15.9429 8.2183 14.4202 8.46802 12.4511C8.69216 14.4479 10.3862 16 12.4429 16H16.4429V12C16.4429 9.96304 14.9202 8.28168 12.9511 8.032C14.9479 7.80787 16.5 6.11376 16.5 4.05714V0.0571429L12.5 0.0571427C10.463 0.0571426 8.78168 1.57973 8.532 3.54888C8.30787 1.55212 6.61376 0 4.55714 0Z"
        fill={color}
      />
    </svg>
  )
}

const ForwardRef = React.forwardRef(Icon)
const MemoForwardRef = React.memo(ForwardRef)

export default MemoForwardRef
