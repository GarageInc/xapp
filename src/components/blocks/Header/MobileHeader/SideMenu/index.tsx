import { AddAppToken } from 'components/AddToken/AddToken'
import NetworkSelector from 'components/Header/NetworkSelector'
import { Box } from 'components/MUI'
import { useWarningFlag } from 'components/WarningWrapper/WarningWrapper'
import { Paths } from 'constants/paths'
import { useActiveWeb3React } from 'hooks/web3'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Container, GradientMenuLabel, HeaderWrapper, MenuIconLabel, NavButtonBase, NormalMenuLabel } from './styles'

interface INavButton {
  iconText: string
  text: string
  route: string
  onClose?: () => void
}

const NavButton = ({ iconText, text, route, onClose }: INavButton) => {
  const location = useLocation()
  const history = useNavigate()
  const isSelected = location.pathname.startsWith(route)

  const handleClick = () => {
    if (onClose) {
      onClose()
    }
    history(route)
  }

  const LabelComp = isSelected ? GradientMenuLabel : NormalMenuLabel

  return (
    <NavButtonBase variant="text" $highlighted={isSelected} onClick={handleClick}>
      <MenuIconLabel>{iconText}</MenuIconLabel>
      <LabelComp>{text}</LabelComp>
    </NavButtonBase>
  )
}

interface ISideMenuContent {
  onClose?: () => void
}

const SideMenu = ({ onClose }: ISideMenuContent) => {
  const { account } = useActiveWeb3React()
  const { notSupportedChain } = useWarningFlag()

  const isValid = !notSupportedChain

  return (
    <Container>
      <HeaderWrapper>
        {account && <NetworkSelector />}
        {isValid && <Box ml={15}>{account ? <AddAppToken /> : null}</Box>}
      </HeaderWrapper>
      <NavButton iconText="" text="Home" route={Paths.HOME} onClose={onClose} />

      <Box flex={1} />
    </Container>
  )
}

export default SideMenu
