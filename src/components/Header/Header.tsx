import useScrollPosition from '@react-hook/window-scroll'
import { useWarningFlag, WrongNetworkBanner } from 'components/WarningWrapper/WarningWrapper'
import { Paths } from 'constants/paths'
import { Flex, Text } from 'rebass'
import styled from 'styled-components'

import Logo from '../../assets/svg/logo.svg'
import { useActiveWeb3React } from '../../hooks/web3'
import Web3Status from '../Web3Status'
import NetworkSelector from './NetworkSelector'

const HeaderFrame = styled.div<{ showBackground: boolean }>`
  display: ${({ showBackground }) => (showBackground ? 'none' : 'grid')};
  background-color: ${({ theme }) => theme.bg0};
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0;
  z-index: 21;
  padding: 12px;

  padding: 10px 25px;

  ${({ theme }) => theme.mediaWidth.upToPhone`
    padding: 0;
    position: relative;
    height: initial;
    margin-bottom: 12px;
  `};
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;
  flex-wrap: wrap;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    justify-content: flex-end;
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;

  /* addresses safari's lack of support for "gap" */
  & > *:not(:first-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: center;
  `};
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 50px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }
`

const BalanceText = styled(Text)`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 400;
  padding: 0px 25px;
  min-width: auto !important;
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: auto;
  text-decoration: none !important;

  :hover {
    cursor: pointer;
  }
`

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.3s;

  width: 52px;
  height: 52px;
  border-radius: 50%;
  box-shadow: 0px 3.333px 16.667px 0px rgba(40, 46, 63, 0.08);

  background-color: ${({ theme }) => theme.bg0};
`

const LogoImg = styled.img``

export default function Header() {
  const { account } = useActiveWeb3React()

  const scrollY = useScrollPosition()

  const { notSupportedChain } = useWarningFlag()

  if (notSupportedChain) {
    return <WrongNetworkBanner />
  }

  if (!account) {
    return null
  }

  return (
    <>
      <HeaderFrame showBackground={scrollY > 16}>
        <Flex>
          {/*<Title href="https://xapp.com" target="_blank">*/}
          {/*TODO decide what to live */}
          <Title href={Paths.DEFAULT}>
            <Icon>
              <LogoImg width="auto" src={Logo} alt="logo" />
            </Icon>
          </Title>
        </Flex>

        <HeaderControls>
          {account && <NetworkSelector />}

          <HeaderElement>
            <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
              <Web3Status />
            </AccountElement>
          </HeaderElement>
        </HeaderControls>
      </HeaderFrame>
    </>
  )
}
