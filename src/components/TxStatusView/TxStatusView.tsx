import explorerIcon from 'assets/icons/explorer.svg'
import { CardCentered } from 'components/Card'
import { AutoColumn, ColumnCenter } from 'components/Column'
import { FormPageWrapper } from 'components/Forms/styled'
import WethIcon from 'components/icons/ethereum'
import LpXfiIcon from 'components/icons/lp-xfi'
import SwapCompletedIcon from 'components/icons/swap-completed'
import { ProgressBar } from 'components/ProgressBar/ProgressBar'
import { ITxTemplateInfo, TransactionInfo } from 'components/TransactionInfo/TransactionInfo'
import { SupportedChainId } from 'constants/chainsinfo'
import { BigNumber } from 'ethers'
import { useActiveWeb3React } from 'hooks/web3'
import { Box } from 'rebass'
import { useIsTransactionPending } from 'state/transactions/hooks'
import styled from 'styled-components'
import { ExternalLink } from 'theme/components'
import { TYPE } from 'theme/theme'
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink'
import { ZERO } from 'utils/isZero'
import { formatDecimal } from 'utils/numberWithCommas'

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

export const TxStatusView = ({
  onBack,
  amount = ZERO,
  color,
  bg,
  hash,
  token = 'WETH',
  header,
  children,
  txInfo,
}: {
  onBack: () => void
  amount?: BigNumber
  color: string
  bg: string
  hash: string
  token: string
  header: any
  children: any
  txInfo?: ITxTemplateInfo
}) => {
  const { chainId = SupportedChainId.XFI } = useActiveWeb3React()

  const isPending = useIsTransactionPending(hash)

  return (
    <FormPageWrapper>
      <CardCentered>
        {header}

        <ColumnCenterStyled>
          <TokenBadge>
            <SwapCompletedIcon color="orange" />
          </TokenBadge>

          <AutoColumn gap="8px" justify="center">
            <Label>
              {isPending ? 'You are about to receive' : 'Now you’ve got'}

              <ReceiveLabel bg={bg}>
                {token === 'WETH' && <WethIcon color={color} />}
                {token === 'lpXFI' && <LpXfiIcon color={color} />}
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
            <ProgressBar completed={!isPending} />
          </Box>

          {children}

          {txInfo && <TransactionInfo info={txInfo} />}
        </ColumnCenterStyled>
      </CardCentered>
    </FormPageWrapper>
  )
}
