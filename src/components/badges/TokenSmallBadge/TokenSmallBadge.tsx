import { Box } from '@mui/material'
import EsXFIIcon from 'components/icons/esXFI'
import WethIcon from 'components/icons/ethereum'
import LpXfiIcon from 'components/icons/lp-xfi'
import UsdtIcon from 'components/icons/usdt'
import XfiIcon from 'components/icons/xfiToken'
import XUsdIcon from 'components/icons/xusd'
import { FC, PropsWithChildren } from 'react'
import styled, { useTheme } from 'styled-components'
import { TYPE } from 'theme/theme'

export type TokenSmallBadgeProps = PropsWithChildren<{
  variant: TokenSmallBadgeVariant
  className?: string
}>

const TokenSmallBadge: FC<TokenSmallBadgeProps> = ({ variant, className, children }) => {
  const theme = useTheme()

  const { label, icon, textColor, bg } = VARIANTS[variant]

  return (
    <Badge bg={bg} className={className}>
      <Box display="flex" width="100%" gap="4px" alignItems="center">
        <Icon className="smallBadgeIcon">{icon}</Icon>
        <TYPE.subHeader fontWeight={500} color={theme[textColor]} className="smallBadgeLabel">
          {label}
        </TYPE.subHeader>
      </Box>

      <Box color={theme[textColor]}>{children}</Box>
    </Badge>
  )
}

const VARIANTS = {
  weth: {
    label: 'WETH',
    icon: <WethIcon color="black" />,
    bg: 'main15',
    textColor: 'dark80',
    iconBg: 'main15',
  },
  lpXFI: {
    label: 'lpXFI',
    icon: <LpXfiIcon color="appViolet" />,
    bg: 'appViolet25',
    textColor: 'appViolet',
    bgIcon: 'appViolet25',
  },
  xfi: { label: 'XFI', icon: <XfiIcon color="main" />, bg: 'main15', textColor: 'main', bgIcon: 'main25' },
  esXFI: {
    label: 'esXFI',
    icon: <EsXFIIcon color="fuchsia" />,
    bg: 'fuchsia25',
    textColor: 'fuchsia',
    bgIcon: 'fuchsia25',
  },
  xusd: {
    label: 'XUSD',
    icon: <XUsdIcon color="black" />,
    bg: 'dark15',
    textColor: 'black',
    bgIcon: 'dark15',
  },
  usdt: {
    label: 'USDT',
    icon: <UsdtIcon color="dark80" />,
    bg: 'main15',
    textColor: 'dark80',
    iconBg: 'main15',
  },
  eth: { label: 'ETH', icon: <WethIcon color="dark" />, bg: 'main15', textColor: 'dark80', iconBg: 'main15' },
} as const

export type TokenSmallBadgeVariant = keyof typeof VARIANTS

const Badge = styled.div<{ bg?: string }>`
  width: fit-content;
  border-radius: 16px;
  background: ${({ theme, bg }) => (theme as any)[bg || 'bg1']};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  padding: 4px 6px;
`

const Icon = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
`

export default TokenSmallBadge
