import * as React from 'react'
import { useTheme } from 'styled-components'
import { ThemeColors } from 'theme/styled'

function Icon(props: React.SVGProps<SVGSVGElement> & { color?: ThemeColors }, svgRef?: React.Ref<SVGSVGElement>) {
  const theme = useTheme()

  const color = props.color && (theme as any)[props.color] ? theme[props.color] : theme.fuchsia

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="16"
      viewBox="0 0 19 16"
      fill="none"
      ref={svgRef}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.13794 0H15.0818C15.3429 0 15.5841 0.142425 15.7143 0.373489L18.9028 6.03063C19.0681 6.32401 19.019 6.69429 18.7831 6.93219L10.007 15.7849C9.72271 16.0717 9.26538 16.0717 8.98109 15.7849L0.216876 6.94415C-0.0244475 6.70073 -0.0696366 6.31962 0.10782 6.02443L3.51594 0.355339C3.64868 0.134554 3.88421 0 4.13794 0ZM13.6687 2.52572V4.11302H10.5513V5.21355C12.7407 5.33115 14.3834 5.81419 14.3956 6.39316L14.3956 7.60011C14.3834 8.17908 12.7407 8.6621 10.5513 8.77971V11.4805H8.48124V8.77971C6.29175 8.6621 4.64906 8.17908 4.63687 7.60011L4.63695 6.39316C4.64913 5.81419 6.29175 5.33115 8.48124 5.21355V4.11302H5.36379V2.52572H13.6687ZM9.51625 7.95052C11.8528 7.95052 13.8058 7.54207 14.2837 6.99663C13.8784 6.53409 12.4124 6.17007 10.5513 6.0701V7.22234C10.2177 7.24027 9.87139 7.24971 9.51625 7.24971C9.1611 7.24971 8.81482 7.24027 8.48124 7.22234V6.0701C6.62007 6.17007 5.15406 6.53409 4.74876 6.99663C5.22671 7.54207 7.17968 7.95052 9.51625 7.95052Z"
        fill={color}
        fillOpacity="0.8"
      />
    </svg>
  )
}

const ForwardRef = React.forwardRef(Icon)
const MemoForwardRef = React.memo(ForwardRef)

export default MemoForwardRef
