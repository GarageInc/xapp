import explorerIcon from 'assets/icons/explorer.svg'
import questionIcon from 'assets/icons/question.svg'
import swapCompleted from 'assets/icons/swap-completed.svg'
import swapStarted from 'assets/icons/swap-started.svg'
import stakingIcon from 'assets/images/menu/staking.svg'
import { ButtonSecondary } from 'components/Button'
import { CardCentered } from 'components/Card'
import { AutoColumn, ColumnCenter } from 'components/Column'
import { ProgressBar } from 'components/ProgressBar/ProgressBar'
import { Row } from 'components/Row'
import { SupportedChainId } from 'constants/chainsinfo'
import { useActiveWeb3React } from 'hooks/web3'
import { Box } from 'rebass'
import styled from 'styled-components'
import { ExternalLink } from 'theme/components'
import { TYPE } from 'theme/theme'
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink'

import { Header, Icon, PageWrapper, SettingsBtn, SettingsIcon, SwapLabel } from './styled'

const TokenBadge = styled.img`
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
`

const Label = styled.div`
  font-weight: 500;
  font-size: 16px;
`

const ExplorerIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 6px;
`

const ColumnCenterStyled = styled(ColumnCenter)`
  justify-content: center;
  gap: 16px;
  margin-top: 60px;
`

export const PendingStakeView = ({ onNewSwap }: { onNewSwap: () => void }) => {
  const { chainId = SupportedChainId.XFI } = useActiveWeb3React()

  const hash = ''

  return (
    <PageWrapper>
      <CardCentered>
        <Header>
          <Row>
            <Icon src={stakingIcon}></Icon>
            <SwapLabel>Stake</SwapLabel>
          </Row>

          <SettingsBtn>
            <SettingsIcon src={questionIcon}></SettingsIcon>
          </SettingsBtn>
        </Header>

        <ColumnCenterStyled>
          <TokenBadge src={swapStarted} />

          <Label>You are about to receive</Label>

          <ExternalLink href={getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION)}>
            View on Explorer
            <ExplorerIcon src={explorerIcon} />
          </ExternalLink>

          <Box width="100%" padding="38px 12px 0 12px">
            <ProgressBar />
          </Box>

          <ButtonSecondary marginTop="16px" onClick={onNewSwap}>
            New Swap
          </ButtonSecondary>
        </ColumnCenterStyled>
      </CardCentered>
    </PageWrapper>
  )
}

const Tokens = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`

const Token = styled.div<{ bg: string }>`
  background: ${({ theme, bg }) => (theme as any)[bg]};
  font-weight: 500;
  font-size: 16px;
  padding: 4px 6px;
  border-radius: 16px;
`

export const PendingUnStakeView = ({ onNewSwap }: { onNewSwap: () => void }) => {
  const { chainId = SupportedChainId.XFI } = useActiveWeb3React()

  const hash = ''

  return (
    <PageWrapper>
      <CardCentered>
        <Header>
          <Row>
            <Icon src={stakingIcon}></Icon>
            <SwapLabel>Stake</SwapLabel>
          </Row>

          <SettingsBtn>
            <SettingsIcon src={questionIcon}></SettingsIcon>
          </SettingsBtn>
        </Header>

        <ColumnCenterStyled>
          <TokenBadge src={swapCompleted} />

          <AutoColumn gap="8px" justify="center">
            <Label>Now you’ve got</Label>

            <Tokens>
              <Token bg="main15">
                <TYPE.body color="main" fontWeight={500} fontSize={14}>
                  XFI 12.42
                </TYPE.body>
              </Token>
              <Token bg="main15">
                <TYPE.body color="dark80" fontWeight={500} fontSize={14}>
                  USDT 12.42
                </TYPE.body>
              </Token>
            </Tokens>
          </AutoColumn>

          <ExternalLink href={getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION)}>
            View on Explorer
            <ExplorerIcon src={explorerIcon} />
          </ExternalLink>

          <Box width="100%" padding="38px 12px 0 12px">
            <ProgressBar completed />
          </Box>

          <ButtonSecondary marginTop="16px" onClick={onNewSwap}>
            New Swap
          </ButtonSecondary>
        </ColumnCenterStyled>
      </CardCentered>
    </PageWrapper>
  )
}
