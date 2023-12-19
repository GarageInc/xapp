import { AutoColumn } from 'components/Column'
import { connections, deprecatedNetworkConnection, networkConnection } from 'connection'
import { ActivationStatus, useActivationState } from 'connection/activate'
import { isSupportedChain } from 'constants/chains'
import { useActiveWeb3React } from 'hooks/web3'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { flexColumnNoWrap } from 'theme/styles'

import usePrevious from '../../hooks/usePrevious'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useWalletModalToggle } from '../../state/application/hooks'
import AccountDetails from '../AccountDetails'
import Modal from '../Modal'
import ConnectionErrorView from './ConnectionErrorView'
import Option from './Option'
import PendingView from './PendingView'

const Arrow = styled.div`
  font-family: 'Font Awesome 6 Pro';
  font-weight: normal;
  position: absolute;
  right: 25px;
  top: 20px;
  font-size: 22px;
  padding: 8px 12px;
  transition: background-color 0.2s ease-in;

  border-radius: 10px;

  &:hover {
    cursor: pointer;
  }
`
const Arrow2 = styled.div`
  font-family: 'Font Awesome 6 Pro';
  font-weight: normal;
  font-size: 22px;
  padding: 8px 10px;
  color: ${({ theme }) => theme.white};

  border-radius: 10px;

  &:hover {
    cursor: pointer;
  }
`

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 25px 25px 0 25px;
  color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
`

const ContentWrapper = styled.div`
  padding: 25px;
  border-radius: 24px;
`

const UpperSection = styled.div`
  position: relative;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`

export const OptionGrid = styled.div`
  display: grid;
  grid-gap: 15px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
  `};
`

const Wrapper = styled.div`
  ${flexColumnNoWrap};
  width: 100%;
  padding: 14px 16px 16px;
  flex: 1;
`

const HoverText = styled.div`
  text-decoration: none;
  color: ${({ theme }) => theme.text1};
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.white}fff;
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: 0.75px;
  text-transform: capitalize;

  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

export const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
}

export default function WalletModal({
  pendingTransactions,
  confirmedTransactions,
  ENSName,
}: {
  pendingTransactions: string[] // hashes of pending
  confirmedTransactions: string[] // hashes of confirmed
  ENSName?: string
}) {
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

  function getModalContent() {
    if (account && walletView === WALLET_VIEWS.ACCOUNT) {
      return (
        <AccountDetails
          toggleWalletModal={toggleWalletModal}
          pendingTransactions={pendingTransactions}
          confirmedTransactions={confirmedTransactions}
          ENSName={ENSName}
          openOptions={() => setWalletView(WALLET_VIEWS.OPTIONS)}
        />
      )
    }
    return (
      <UpperSection>
        <Arrow onClick={toggleWalletModal}></Arrow>
        {walletView !== WALLET_VIEWS.ACCOUNT ? (
          <HeaderRow color="blue">
            <Arrow2
              onClick={() => {
                setPendingError(false)
                setWalletView(WALLET_VIEWS.ACCOUNT)
              }}
            >
              <></>
            </Arrow2>
          </HeaderRow>
        ) : (
          <HeaderRow>
            <HoverText>
              <>My wallet</>
            </HoverText>
          </HeaderRow>
        )}

        <ContentWrapper>
          {walletView === WALLET_VIEWS.PENDING ? (
            <PendingView error={pendingError} reset={() => setWalletView(WALLET_VIEWS.OPTIONS)} />
          ) : (
            <>
              {activationState.status === ActivationStatus.ERROR ? (
                <ConnectionErrorView />
              ) : (
                <AutoColumn gap="16px">
                  <OptionGrid data-testid="option-grid">
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
      </UpperSection>
    )
  }

  return (
    <Modal isOpenFlag={walletModalOpen} onDismissHandler={toggleWalletModal} minHeight={false} maxHeight={90}>
      <Wrapper>{getModalContent()}</Wrapper>
    </Modal>
  )
}
