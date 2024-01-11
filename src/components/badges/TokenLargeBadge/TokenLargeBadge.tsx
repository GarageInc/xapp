import TokenSmallBadge, { TokenSmallBadgeProps } from 'components/badges/TokenSmallBadge/TokenSmallBadge'
import { FC } from 'react'
import styled from 'styled-components'
import { ThemeColors } from 'theme/styled'

const TokenLargeBadge: FC<TokenSmallBadgeProps> = ({ variant, className }) => {
  const { iconBg } = VARIANTS[variant]
  return <StyledBadge variant={variant} iconBg={iconBg} className={className} />
}

const VARIANTS = {
  weth: {
    iconBg: 'main15',
  },
  lpXFI: {
    iconBg: 'appViolet25',
  },
  xfi: { iconBg: 'main25' },
  esXFI: {
    iconBg: 'fuchsia25',
  },
  xusd: {
    iconBg: 'dark15',
  },
  usdt: {
    iconBg: 'main15',
  },
  eth: { iconBg: 'main15' },
} as const

const StyledBadge = styled(TokenSmallBadge)<{ iconBg?: ThemeColors }>`
  padding: 6px;
  border-radius: 16px;

  & > div:first-child {
    gap: 6px;
  }

  .smallBadgeIcon {
    width: 32px;
    height: 32px;
    padding: 8px;
    border-radius: 50%;
    background-color: ${({ theme, iconBg }) => theme[iconBg || 'main15']};
  }

  .smallBadgeLabel {
    font-size: 32px;
    font-weight: 400;
  }
`
export default TokenLargeBadge
