import { IconButton, Typography } from '@mui/material'
import { Drawer as MuiDrawer } from '@mui/material'
import { Box } from 'components/MUI'
import Web3StatusComp from 'components/Web3Status'
import styled from 'styled-components'

export const MobileHeaderContainer = styled(Box)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 56px;

  border-radius: 0px 0px 16px 16px;
  background: #27273e;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);
`

export const HamburgerButton = styled(IconButton)`
  width: 47px;
  height: 47px;
`

export const Title = styled(Typography)`
  font-weight: bold;
  font-size: 20px;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-size: 18px;
  `};
`

export const Web3Status = styled(Web3StatusComp)`
  background-color: unset;
  padding: 0 12px;
  width: unset;
  align-self: stretch;

  p {
    display: none;
  }
`

export const Drawer = styled(MuiDrawer)`
  .MuiPaper-root {
    overflow: hidden;
    border-radius: 0px 32px 32px 0px;
    background: ${({ theme }) => theme.bg2};
    box-shadow: 5px 0px 44px 0px rgba(0, 0, 0, 0.25);
    width: 250px;
  }
`
