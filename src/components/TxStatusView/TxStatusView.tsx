import { TokenSymbol } from 'components/blocks/AmountInput/useAppCoins'
import { CardCentered } from 'components/Card'
import { AutoColumn, ColumnCenter } from 'components/Column'
import { FormPageWrapper } from 'components/Forms/styled'
import ExplorerLinkIcon from 'components/icons/explorerLinkIcon'
import SwapCompletedIcon from 'components/icons/swap-completed'
import SwapStartedIcon from 'components/icons/swap-started'
import { ProgressBar } from 'components/ProgressBar/ProgressBar'
import TokenSmallBadge, { TokenSmallBadgeVariant } from 'components/TokenSmallBadge/TokenSmallBadge'
import { ITxTemplateInfo, TransactionInfo } from 'components/TransactionInfo/TransactionInfo'
import { SupportedChainId } from 'constants/chainsinfo'
import { BigNumber } from 'ethers'
import { useActiveWeb3React } from 'hooks/web3'
import { FC, PropsWithChildren, ReactNode } from 'react'
import { Box } from 'rebass'
import { useIsTransactionPending } from 'state/transactions/hooks'
import styled, { css } from 'styled-components'
import { ExternalLink, rotate } from 'theme/components'
import { ThemeColors } from 'theme/styled'
import { TYPE } from 'theme/theme'
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink'
import { ZERO } from 'utils/isZero'
import { formatDecimal } from 'utils/numberWithCommas'

const TokenBadge = styled.div<{ animated: boolean }>`
  margin-bottom: 16px;
  ${({ animated }) =>
    animated
      ? css`
          animation: 2s ${rotate} linear infinite;
        `
      : ''}
`

const Label = styled.div`
  font-weight: 500;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
`

const ColumnCenterStyled = styled(ColumnCenter)`
  justify-content: center;
  gap: 16px;
  margin-top: 60px;
`

type Props = PropsWithChildren<{
  amount?: BigNumber
  isLoading?: boolean
  processLabel?: string
  completedLabel?: string
  color: ThemeColors
  hash: string
  token: TokenSmallBadgeVariant
  header?: ReactNode
  txInfo?: ITxTemplateInfo
}>

export const TxStatusView: FC<Props> = ({
  amount = ZERO,
  isLoading = false,
  processLabel = 'You are about to receive',
  completedLabel = 'Now you’ve got',
  color = 'orange',
  hash,
  token = TokenSymbol.weth,
  header,
  children,
  txInfo,
}) => {
  const { chainId = SupportedChainId.XFI_TESTNET } = useActiveWeb3React()

  const isPending = useIsTransactionPending(hash)
  const isInProcess = isLoading || isPending

  return (
    <FormPageWrapper>
      <CardCentered>
        {header}

        <ColumnCenterStyled>
          <TokenBadge animated={isInProcess}>
            {isInProcess ? <SwapStartedIcon color={color} /> : <SwapCompletedIcon color={color} />}
          </TokenBadge>

          <AutoColumn gap="8px" justify="center">
            <Label>
              {isInProcess ? processLabel : completedLabel}

              <TokenSmallBadge variant={token}>
                <TYPE.subHeader color="inherit">{formatDecimal(amount)} </TYPE.subHeader>
              </TokenSmallBadge>
            </Label>
          </AutoColumn>

          <ExternalLink href={getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION)} color={color}>
            View on Explorer
            <ExplorerLinkIcon />
          </ExternalLink>

          <Box width="100%" padding="38px 12px 0 12px">
            <ProgressBar position={isInProcess ? undefined : 100} color={color} />
          </Box>

          {children}

          {txInfo && <TransactionInfo info={txInfo} />}
        </ColumnCenterStyled>
      </CardCentered>
    </FormPageWrapper>
  )
}
