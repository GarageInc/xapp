import clsx from 'clsx'
import TokenLargeBadge from 'components/badges/TokenLargeBadge/TokenLargeBadge'
import { TokenSmallBadgeProps } from 'components/badges/TokenSmallBadge/TokenSmallBadge'
import { FC, useState } from 'react'
import styled from 'styled-components'
import { ThemeColors } from 'theme/styled'

type Props = TokenSmallBadgeProps & {
  isDisabled?: boolean
}
const TokenLargeWhiteBgBadge: FC<Props> = ({ variant, isDisabled = false }) => {
  const [isBadgeClassName, setIsBadgeClassName] = useState(false)
  const settings = VARIANTS[variant]

  return (
    <StyledBadge
      {...settings}
      onMouseEnter={() => {
        !isDisabled && setIsBadgeClassName(true)
      }}
      onMouseLeave={() => {
        setIsBadgeClassName(false)
      }}
    >
      <TokenLargeBadge variant={variant} className={clsx({ badge: isBadgeClassName, isDisabled })} />
    </StyledBadge>
  )
}

const VARIANTS = {
  weth: {
    disabledBg: 'dark04',
    disabledIconBg: 'dark04',
    disabledTextColor: 'dark25',
    hoveredBg: 'main25',
    hoveredIconBg: 'main25',
  },
  lpXFI: {
    disabledBg: 'appViolet15',
    disabledIconBg: 'appViolet15',
    disabledTextColor: 'appViolet35',
    hoveredBg: 'appViolet35',
    hoveredIconBg: 'appViolet35',
  },
  xfi: {
    disabledBg: 'main15',
    disabledIconBg: 'main15',
    disabledTextColor: 'main35',
    hoveredBg: 'main35',
    hoveredIconBg: 'main35',
  },
  esXFI: {
    disabledBg: 'fuchsia15',
    disabledIconBg: 'fuchsia15',
    disabledTextColor: 'fuchsia35',
    hoveredBg: 'fuchsia35',
    hoveredIconBg: 'fuchsia35',
  },
  xusd: {
    disabledBg: 'dark06',
    disabledIconBg: 'dark06',
    disabledTextColor: 'dark30',
    hoveredBg: 'dark25',
    hoveredIconBg: 'dark25',
  },
  usdt: {
    disabledBg: 'dark04',
    disabledIconBg: 'dark04',
    disabledTextColor: 'dark25',
    hoveredBg: 'main25',
    hoveredIconBg: 'main25',
  },
  eth: {
    disabledBg: 'dark04',
    disabledIconBg: 'dark04',
    disabledTextColor: 'dark25',
    hoveredBg: 'main25',
    hoveredIconBg: 'main25',
  },
} as const

const StyledBadge = styled.div<{
  disabledBg: ThemeColors
  disabledIconBg: ThemeColors
  disabledTextColor: ThemeColors
  hoveredBg: ThemeColors
  hoveredIconBg: ThemeColors
}>`
  padding: 6px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.light};
  box-shadow: ${({ theme }) => theme.boxShadow};

  .isDisabled {
    background-color: ${({ theme, disabledBg }) => theme[disabledBg]};
    cursor: auto;

    .smallBadgeIcon {
      background-color: ${({ theme, disabledIconBg }) => theme[disabledIconBg]};

      svg {
        opacity: 0.35;
      }
    }

    .smallBadgeLabel {
      color: ${({ theme, disabledTextColor }) => theme[disabledTextColor]};
    }
  }

  :hover {
    .badge {
      transition: background-color 0.3s;
      background-color: ${({ theme, hoveredBg }) => theme[hoveredBg]};

      .smallBadgeIcon {
        transition: background-color 0.3s;
        background-color: ${({ theme, hoveredIconBg }) => theme[hoveredIconBg]};
      }
    }
  }
`
export default TokenLargeWhiteBgBadge
