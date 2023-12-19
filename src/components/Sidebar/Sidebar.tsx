import './sidebar.scss'

import React, { useCallback, useEffect, useState } from 'react'
import { ProSidebar, SidebarContent } from 'react-pro-sidebar'
import styled from 'styled-components'

import { Paths } from '../../constants/paths'
import { activeClassName, StyledNavLink } from '../NavigationTabs'
import bridgeSvg from './../../assets/images/menu/bridge.svg'
import getSvg from './../../assets/images/menu/get.svg'
import rewardsSvg from './../../assets/images/menu/rewards.svg'
import stakingSvg from './../../assets/images/menu/staking.svg'
import swapSvg from './../../assets/images/menu/swap.svg'

const StyledMenuLinkBattle = styled(StyledNavLink).attrs({
  activeClassName,
})`
  opacity: ${({ inactive = false }) => (inactive ? '0.4' : '1')};
  pointer-events: ${({ inactive = false }) => (inactive ? 'none' : 'initial')};
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-column-gap: 15px;
  align-items: center;

  font-weight: bold;
  transition: all 0.3s;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0px;
  }

  transition: all 0.3s ease-in;

  &:hover {
    transform: translateX(10px);
    color: ${({ theme }) => theme.darkOrange};
  }

  &.${activeClassName} {
    color: ${({ theme }) => theme.darkOrange};
  }
`

const Btn = styled.span`
  border-radius: 12px;
  min-width: 60px;
  margin-left: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  font-size: 25px;

  min-width: 50px;
  font-size: 20px;
  border-radius: 10px;
  padding: 14px 14px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    min-width: 40px;
    font-size: 16px;
    padding: 8px;
    border-radius: 8px;
  `};
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  margin-bottom: 25px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    overflow: hidden;
    z-index: 100;
  `};
`

// https://github.com/azouaoui-med/react-pro-sidebar/blob/master/src/scss/variables.scss
const mql = window.matchMedia(`(min-width: 1024px)`)

export const useSidebarState = () => {
  const [open, setOpen] = useState(false)
  const [docked, setDocked] = useState(() => mql.matches)

  const onToggle = (value: boolean) => setOpen(value)
  const onOpen = () => setOpen(true)

  const mediaQueryChanged = useCallback(() => {
    setDocked(mql.matches)
    setOpen(false)
  }, [setDocked, setOpen])

  useEffect(() => {
    mql.addListener(mediaQueryChanged)

    return () => mql.removeListener(mediaQueryChanged)
  }, [mediaQueryChanged])

  return { open, onToggle, onOpen, docked }
}

const Label = styled.span``

interface IProps {
  onToggle: (b: boolean) => void
  open: boolean
}

const SidebarInner = ({ open, onToggle }: IProps) => {
  return (
    <ProSidebar toggled={open} onToggle={onToggle}>
      <SidebarContent>
        <Content>
          <StyledMenuLinkBattle to={Paths.GET}>
            <Btn>
              <img src={getSvg} alt="get" />
            </Btn>
            <Label>Get</Label>
          </StyledMenuLinkBattle>

          <StyledMenuLinkBattle to={Paths.SWAP}>
            <Btn>
              <img src={swapSvg} alt="swap" />
            </Btn>
            <Label>Swap</Label>
          </StyledMenuLinkBattle>

          <StyledMenuLinkBattle to={Paths.BRIDGE}>
            <Btn>
              <img src={bridgeSvg} alt="bridge" />
            </Btn>
            <Label>Bridge</Label>
          </StyledMenuLinkBattle>

          <StyledMenuLinkBattle to={Paths.STAKING}>
            <Btn>
              <img src={stakingSvg} alt="staking" />
            </Btn>
            <Label>Staking</Label>
          </StyledMenuLinkBattle>

          <StyledMenuLinkBattle to={Paths.REWARDS}>
            <Btn>
              <img src={rewardsSvg} alt="rewards" />
            </Btn>
            <Label>Rewards</Label>
          </StyledMenuLinkBattle>
        </Content>
      </SidebarContent>
    </ProSidebar>
  )
}

export default SidebarInner
