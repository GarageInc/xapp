import { Typography } from '@mui/material'
import { Box, Button, GradientTypography } from 'components/MUI'
import { ZooTextGradient } from 'components/ZooText/ZooText'
import styled from 'styled-components'

export const Container = styled(Box)`
  height: 100%;
  padding-bottom: 50px;
`

export const GradientMenuLabel = styled(GradientTypography)`
  font-size: 15px;
  font-weight: bold;
`

export const NormalMenuLabel = styled(Typography)`
  font-size: 15px;
  font-weight: 500;
  color: white;
`

export const MenuIconLabel = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: 'Font Awesome 6 Pro';
  font-weight: bold;
  min-width: 35px;
  font-size: 20px;
  margin-right: 10px;
  color: white;
`

export const NavButtonBase = styled(Button)<{ $highlighted: boolean }>`
  padding: 0 20px;
  height: 50px;
  margin: 8px 4px 0;
  border-radius: 25px;
  justify-content: flex-start;

  ${({ $highlighted }) =>
    $highlighted &&
    `
      ${MenuIconLabel} {
        color: #FD5400
      }
  `}
`

export const HeaderWrapper = styled(Box)`
  flex-direction: row;
  align-items: center;
  margin: 24px 16px 16px;
`

const Text = styled(ZooTextGradient)`
  text-align: center;
  font-weight: bold;
  font-size: 13px;
  line-height: normal;
`

export const SwapTextWrapper = styled(Box)`
  align-items: center;
  justify-content: center;
  height: 50px;
`

export const SwapText = styled(Text)`
  font-size: 18px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 15px;
  `};
`
