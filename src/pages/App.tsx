import './App.scss'

import UniwalletModal from 'components/AccountDetails/UniwalletModal'
import { useIsMobileDevice } from 'components/blocks/Header'
import Header from 'components/Header/Header'
import Polling from 'components/Header/Polling'
import Loader from 'components/Loader'
import { MobileMenu } from 'components/MobileMenu/MobileMenu'
import { Box } from 'components/MUI'
import WarningWrapper from 'components/WarningWrapper/WarningWrapper'
import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'

import ErrorBoundary from '../components/ErrorBoundary'
import Popups from '../components/Popups'
import Sidebar, { useSidebarState } from '../components/Sidebar/Sidebar'
import { Paths } from '../constants/paths'
import { useActiveWeb3React } from '../hooks/web3'
import Bridge from './Bridge/Bridge'
import Get from './Get/Get'
import NotFound from './NotFound/NotFound'
import Rewards from './Rewards/Rewards'
import Staking from './Staking/Staking'
import Swap from './Swap/Swap'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  height: 100%;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  z-index: 1;
  width: 100%;
  padding: 70px 0 0 0;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    padding: 70px 0 0 0;
  `};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 70px 0 0 0;
  `};
  ${({ theme }) => theme.mediaWidth.upToTablet`
    padding: 0 0 0 0;
  `};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 13px 0 0 0;
  `};

  .pro-sidebar {
    max-width: 280px;
    min-width: 280px;
    position: sticky;
    height: calc(100% - 70px);
    max-height: 100vh;

    ${({ theme }) => theme.mediaWidth.upToExtraLarge`
      max-width: 280px;
      min-width: 280px;
    `};
  }

  .pro-sidebar-footer {
    position: fixed;
    bottom: 25px;
    width: 250px;
  }
`

const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 0;
  padding: 25px;

  ${({ theme }) => theme.mediaWidth.upToPhone`
    padding: 0 12px 110px 12px;
    margin-top: 70px;
  `};
`

export default function App() {
  return (
    <ErrorBoundary>
      <AppWrapper>
        <Content />
      </AppWrapper>
    </ErrorBoundary>
  )
}

const Content = () => {
  const { open, onToggle } = useSidebarState()
  const isMobileDevice = useIsMobileDevice()

  const { chainId } = useActiveWeb3React()

  return (
    <>
      <Popups />
      <Header />
      <WarningWrapper>
        <>
          <BodyWrapper>
            {!isMobileDevice && <Sidebar onToggle={onToggle} open={open} />}
            <ContentWrapper>
              <Box position="relative" width="100%" flex={1}>
                {chainId && <AppRoutes />}
              </Box>
              {isMobileDevice && <MobileMenu />}
              <Polling />
            </ContentWrapper>
          </BodyWrapper>
        </>
      </WarningWrapper>

      <UniwalletModal />
    </>
  )
}

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={Paths.GET} element={<Get />} />
        <Route path={Paths.SWAP} element={<Swap />} />
        <Route path={Paths.REWARDS} element={<Rewards />} />
        <Route path={Paths.BRIDGE} element={<Bridge />} />
        <Route path={Paths.STAKING} element={<Staking />} />
        <Route path={Paths.NOT_FOUND} element={<NotFound />} />
        <Route path={Paths.DEFAULT} element={<Staking />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </Suspense>
  )
}
