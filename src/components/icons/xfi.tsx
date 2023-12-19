import * as React from 'react'
import { useTheme } from 'styled-components'
import { Color } from 'theme/styled'

function Icon(props: React.SVGProps<SVGSVGElement> & { color?: Color }, svgRef?: React.Ref<SVGSVGElement>) {
  const theme = useTheme()

  const color = (props.color && (theme as any)[props.color]) || theme.green

  return (
    <svg
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path
        d="M10.0508 5.63037L6.96891 3.25346L10.0508 0.876556L13.9181 0.876624L17 3.25353M10.0508 5.63037L13.9181 5.63044M10.0508 5.63037V15.1335M13.9181 5.63044L17 3.25353M13.9181 5.63044V10.56V15.1336M17 3.25353V7.49813L15.9321 8.89502L17 10.2919V12.7567L13.9181 15.1336M4.08189 5.62051L1 3.24361M4.08189 5.62051L7.9492 5.62058M4.08189 5.62051V10.5501V15.1237M1 3.24361L4.08189 0.866699L7.9492 0.866767L11.0311 3.24367L7.9492 5.62058M1 3.24361V7.48821L2.06789 8.8851L1 10.282V12.7468L4.08189 15.1237M7.9492 5.62058V15.1237M10.0508 15.1335L13.9181 15.1336M10.0508 15.1335L8.99366 14.3182L7.9492 15.1237M4.08189 15.1237L7.9492 15.1237"
        stroke={color}
      />
    </svg>
  )
}

const ForwardRef = React.forwardRef(Icon)
const MemoForwardRef = React.memo(ForwardRef)

export default MemoForwardRef
