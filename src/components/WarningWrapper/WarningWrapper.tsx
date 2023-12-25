import { AppLink } from 'components/AppLink/AppLink'
import { ButtonSwitch } from 'components/Button'
import { AutoColumn } from 'components/Column'
import { useHandleChainSwitch } from 'components/Header/NetworkSelector'
import ConnectionErrorView from 'components/WalletModal/ConnectionErrorView'
import Option from 'components/WalletModal/Option'
import PendingView from 'components/WalletModal/PendingView'
import { OptionGrid, WALLET_VIEWS } from 'components/WalletModal/WalletModal'
import { connections, deprecatedNetworkConnection, networkConnection } from 'connection'
import { ActivationStatus, useActivationState } from 'connection/activate'
import { isSupportedChain } from 'constants/chains'
import { SupportedChainId } from 'constants/chainsinfo'
import usePrevious from 'hooks/usePrevious'
import React, { useCallback, useEffect, useState } from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useWalletModalToggle } from 'state/application/hooks'
import styled from 'styled-components'
import { TYPE } from 'theme/theme'

import { useActiveWeb3React } from '../../hooks/web3'
import leftSvg from './left-logo.svg'
import rightSvg from './right-logo.svg'

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 25px 120px;

  ${({ theme }) => theme.mediaWidth.upToPhone`
    padding: 120px 24px;
  `};
`

const ContentWarningStyled = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
  margin: auto;
  justify-content: center;
`

const Title = styled.div`
  font-weight: 500;
  font-size: 65px;

  ${({ theme }) => theme.mediaWidth.upToPhone`
    font-size: 24px;
  `};
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: 24px 0;
`

const Imgs = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`

interface IProps {
  children?: React.ReactNode
}

export const useWarningFlag = () => {
  const { account, chainId } = useActiveWeb3React()

  if (!chainId) {
    return {
      notSupportedChain: false,
      account,
    }
  }

  return {
    notSupportedChain: chainId !== SupportedChainId.XFI,
    account,
  }
}

const ConfirmBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 24px;
  color: ${({ theme }) => theme.text1};
  font-weight: 400;
  font-size: 18px;
  line-height: 20px;
  background-color: ${({ theme }) => theme.red};
  width: 100%;
  height: 70px;

  ${({ theme }) => theme.mediaWidth.upToPhone`
      flex-direction: column;
      height: auto;
    `};
`

const SwitchBtn = styled(ButtonSwitch)`
  margin-left: 83px;
  width: initial;
  border: 1px solid ${({ theme }) => theme.white};
  border-radius: 50px;
  padding: 16px 36px;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      margin: 28px 0 0 0;
      width: 100%;
    `};
`

const Suggestion = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.white};
`

export const WrongNetworkBanner = () => {
  const { chainId } = useActiveWeb3React()
  const handleChainSwitch = useHandleChainSwitch()

  const toggleChain = useCallback(() => {
    handleChainSwitch(SupportedChainId.XFI, true)
  }, [handleChainSwitch])

  if (chainId !== SupportedChainId.XFI) {
    return (
      <ConfirmBlock>
        <Suggestion>
          <>xApp is working on XFI Mainnet</>
        </Suggestion>

        <SwitchBtn onClick={toggleChain} active>
          Switch Network
        </SwitchBtn>
      </ConfirmBlock>
    )
  }

  return null
}

export default function WarningWrapper({ children }: IProps) {
  const { account, notSupportedChain } = useWarningFlag()

  return <>{account ? !notSupportedChain ? children : <Banner /> : <Banner />}</>
}

const Banner = () => {
  // important that these are destructed from the account-specific web3-react context
  const { chainId, account, connector } = useActiveWeb3React()

  const { activationState } = useActivationState()
  const fallbackProviderEnabled = true
  // Keep the network connector in sync with any active user connector to prevent chain-switching on wallet disconnection.
  useEffect(() => {
    if (chainId && isSupportedChain(chainId) && connector !== networkConnection.connector) {
      if (fallbackProviderEnabled) {
        networkConnection.connector.activate(chainId)
      } else {
        deprecatedNetworkConnection.connector.activate(chainId)
      }
    }
  }, [chainId, connector, fallbackProviderEnabled])

  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT)

  const [pendingError, setPendingError] = useState<boolean>()

  const walletModalOpen = useModalOpen(ApplicationModal.WALLET)
  const toggleWalletModal = useWalletModalToggle()

  const previousAccount = usePrevious(account)

  // close on connection, when logged out before
  useEffect(() => {
    if (account && !previousAccount && walletModalOpen) {
      toggleWalletModal()
    }
  }, [account, previousAccount, toggleWalletModal, walletModalOpen])

  // always reset to account view
  useEffect(() => {
    if (walletModalOpen) {
      setPendingError(false)
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [walletModalOpen])

  // close modal when a connection is successful
  const connectorPrevious = usePrevious(connector)
  useEffect(() => {
    if (walletModalOpen && connector && connector !== connectorPrevious) {
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [setWalletView, connector, walletModalOpen, connectorPrevious])

  return (
    <Content>
      <Imgs>
        <img src={leftSvg} alt="left" />
        <img src={rightSvg} alt="right" />
      </Imgs>

      <ContentWarningStyled>
        <Title>Connect wallet</Title>

        <ContentWrapper>
          {walletView === WALLET_VIEWS.PENDING ? (
            <PendingView error={pendingError} reset={() => setWalletView(WALLET_VIEWS.OPTIONS)} />
          ) : (
            <>
              {activationState.status === ActivationStatus.ERROR ? (
                <ConnectionErrorView />
              ) : (
                <AutoColumn gap="16px">
                  <OptionGrid>
                    {connections
                      .filter((connection) => connection.shouldDisplay())
                      .map((connection) => (
                        <Option key={connection.getName()} connection={connection} />
                      ))}
                  </OptionGrid>
                </AutoColumn>
              )}
            </>
          )}
        </ContentWrapper>

        <TYPE.body textAlign="center" marginBottom="12px">
          By connecting the wallet, you agree to CrossFi Terms of Use and consent to its Privacy Policy
        </TYPE.body>

        <AppLink to="/#">
          <div>Read more</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M14 2H10M14 2L8 8M14 2V6"
              stroke="#FC60A8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 8.66667V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H7.33333"
              stroke="#FC60A8"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </AppLink>
      </ContentWarningStyled>
    </Content>
  )
}
