import {
  Drawer,
  HamburgerButton,
  MobileHeaderContainer,
  Web3Status,
} from 'components/blocks/Header/MobileHeader/styles'
import useMobileHeader from 'components/blocks/Header/MobileHeader/useMobileHeader'

import hamburgerIcon from './icons/hamburger.svg'
import SideMenu from './SideMenu'

const MobileHeader = () => {
  const { drawerOpen, setDrawerOpen } = useMobileHeader()

  return (
    <MobileHeaderContainer>
      <HamburgerButton onClick={() => setDrawerOpen(true)}>
        <img src={hamburgerIcon} />
      </HamburgerButton>

      <Web3Status />

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <SideMenu onClose={() => setDrawerOpen(false)} />
      </Drawer>
    </MobileHeaderContainer>
  )
}

export default MobileHeader
