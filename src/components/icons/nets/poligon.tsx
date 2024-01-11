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
        d="M12.6005 5.66766C12.3446 5.52522 12.0157 5.52522 11.7232 5.66766L9.67624 6.84273L8.28721 7.5905L6.27676 8.76558C6.02089 8.90801 5.69191 8.90801 5.39948 8.76558L3.82768 7.83976C3.5718 7.69733 3.38903 7.41246 3.38903 7.09199V5.31157C3.38903 5.02671 3.53525 4.74184 3.82768 4.5638L5.39948 3.67359C5.65535 3.53116 5.98433 3.53116 6.27676 3.67359L7.84856 4.59941C8.10444 4.74184 8.28721 5.02671 8.28721 5.34718V6.52226L9.67624 5.73887V4.52819C9.67624 4.24332 9.53003 3.95846 9.2376 3.78042L6.31332 2.10682C6.05744 1.96439 5.72846 1.96439 5.43603 2.10682L2.43864 3.81602C2.14621 3.95846 2 4.24332 2 4.52819V7.87537C2 8.16024 2.14621 8.4451 2.43864 8.62315L5.39948 10.2967C5.65535 10.4392 5.98433 10.4392 6.27676 10.2967L8.28721 9.15727L9.67624 8.37389L11.6867 7.23442C11.9426 7.09199 12.2715 7.09199 12.564 7.23442L14.1358 8.12463C14.3916 8.26706 14.5744 8.55193 14.5744 8.8724V10.6528C14.5744 10.9377 14.4282 11.2226 14.1358 11.4006L12.6005 12.2908C12.3446 12.4332 12.0157 12.4332 11.7232 12.2908L10.1514 11.4006C9.89556 11.2582 9.71279 10.9733 9.71279 10.6528V9.51335L8.32376 10.2967V11.4718C8.32376 11.7567 8.46997 12.0415 8.7624 12.2196L11.7232 13.8932C11.9791 14.0356 12.3081 14.0356 12.6005 13.8932L15.5614 12.2196C15.8172 12.0772 16 11.7923 16 11.4718V8.08902C16 7.80415 15.8538 7.51929 15.5614 7.34125L12.6005 5.66766Z"
        fill={color}
      />
    </svg>
  )
}

const ForwardRef = React.forwardRef(Icon)
const MemoForwardRef = React.memo(ForwardRef)

export default MemoForwardRef
