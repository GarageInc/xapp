import MobileHeader from 'components/blocks/Header/MobileHeader/MobileHeader'
import DesktopHeader from 'components/Header/Header'
import { useWindowSize } from 'hooks/useWindowSize'
import { useMemo } from 'react'
import { MEDIA_WIDTHS } from 'theme/theme'

export const useIsMobileDevice = () => {
  const { width: windowWidth } = useWindowSize()

  return useMemo(() => windowWidth && windowWidth <= MEDIA_WIDTHS.upToTablet, [windowWidth])
}
const Header = () => {
  const isMobileDevice = useIsMobileDevice()

  return <>{isMobileDevice ? <MobileHeader /> : <DesktopHeader />}</>
}

export default Header
