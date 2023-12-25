import explorerIcon from 'assets/icons/explorer.svg'
import stakingIcon from 'assets/images/menu/staking.svg'
import { ButtonSecondary } from 'components/Button'
import { CardCentered } from 'components/Card'
import { AutoColumn, ColumnCenter } from 'components/Column'
import { ExplanationBtn } from 'components/ExplanationBtn/ExplanationBtn'
import LpIcon from 'components/icons/lp-xfi'
import SwapCompletedIcon from 'components/icons/swap-completed'
import SwapStartedIcon from 'components/icons/swap-started'
import { ProgressBar } from 'components/ProgressBar/ProgressBar'
import { Row } from 'components/Row'
import { SupportedChainId } from 'constants/chainsinfo'
import { BigNumber } from 'ethers'
import { useActiveWeb3React } from 'hooks/web3'
import { Box } from 'rebass'
import styled from 'styled-components'
import { ExternalLink } from 'theme/components'
import { TYPE } from 'theme/theme'
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink'
import { ZERO } from 'utils/isZero'
import { formatDecimal } from 'utils/numberWithCommas'

import { Header, Icon, PageWrapper, SwapLabel } from './styled'

const TokenBadge = styled.div`
  margin-bottom: 16px;
`

const Label = styled.div`
  font-weight: 500;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
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

const ReceiveLabel = styled.div<{ bg?: string }>`
  border-radius: 16px;
  background: ${({ theme, bg }) => (theme as any)[bg || 'bg1']};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding: 4px 6px;
`

export const StakingExplanation = () => <ExplanationBtn title="Stake lpXFI for esXFI Rewards and ETH Rewards" />

export const PendingStakeView = ({
  onBack,
  amount = ZERO,
  token = 'lpXFI',
  color,
  bg,
  hash,
}: {
  onBack: () => void
  amount?: BigNumber
  color: string
  bg: string
  hash: string
  token: string
}) => {
  const { chainId = SupportedChainId.XFI } = useActiveWeb3React()

  return (
    <PageWrapper>
      <CardCentered>
        <Header>
          <Row>
            <Icon src={stakingIcon}></Icon>
            <SwapLabel>Stake</SwapLabel>
          </Row>

          <StakingExplanation />
        </Header>

        <ColumnCenterStyled>
          <TokenBadge>
            <SwapStartedIcon color="darkOrange" />
          </TokenBadge>

          <Label>
            You are about to receive
            <ReceiveLabel bg={bg}>
              <LpIcon color={color} />
              <TYPE.subHeader color={color}>{formatDecimal(amount)}</TYPE.subHeader>
              <TYPE.subHeader color={color}>{token}</TYPE.subHeader>
            </ReceiveLabel>
          </Label>

          <ExternalLink href={getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION)}>
            View on Explorer
            <ExplorerIcon src={explorerIcon} />
          </ExternalLink>

          <Box width="100%" padding="38px 12px 0 12px">
            <ProgressBar />
          </Box>

          <ButtonSecondary marginTop="16px" onClick={onBack}>
            New Swap
          </ButtonSecondary>
        </ColumnCenterStyled>
      </CardCentered>
    </PageWrapper>
  )
}

export const PendingUnStakeView = ({
  onBack,
  amount = ZERO,
  color,
  bg,
  hash,
  token = 'lpXFI',
}: {
  onBack: () => void
  amount?: BigNumber
  color: string
  bg: string
  hash: string
  token: string
}) => {
  const { chainId = SupportedChainId.XFI } = useActiveWeb3React()

  return (
    <PageWrapper>
      <CardCentered>
        <Header>
          <Row>
            <Icon src={stakingIcon}></Icon>
            <SwapLabel>Stake</SwapLabel>
          </Row>

          <StakingExplanation />
        </Header>

        <ColumnCenterStyled>
          <TokenBadge>
            <SwapCompletedIcon color="darkOrange" />
          </TokenBadge>

          <AutoColumn gap="8px" justify="center">
            <Label>
              Now you’ve got{' '}
              <ReceiveLabel bg={bg}>
                <LpIcon color={color} />
                <TYPE.subHeader color={color}>{formatDecimal(amount)} </TYPE.subHeader>
                <TYPE.subHeader color={color}>{token}</TYPE.subHeader>
              </ReceiveLabel>
            </Label>
          </AutoColumn>

          <ExternalLink href={getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION)}>
            View on Explorer
            <ExplorerIcon src={explorerIcon} />
          </ExternalLink>

          <Box width="100%" padding="38px 12px 0 12px">
            <ProgressBar completed />
          </Box>

          <ButtonSecondary marginTop="16px" onClick={onBack}>
            Unstake more
          </ButtonSecondary>
        </ColumnCenterStyled>
      </CardCentered>
    </PageWrapper>
  )
}
