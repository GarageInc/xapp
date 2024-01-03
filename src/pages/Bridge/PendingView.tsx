import bridgeIcon from 'assets/images/menu/bridge.svg'
import { TokenSmallBadgeVariant } from 'components/badges/TokenSmallBadge/TokenSmallBadge'
import { TokenSymbol } from 'components/blocks/AmountInput/useAppCoins'
import { ButtonViolet } from 'components/Button'
import { FormHeader } from 'components/FormHeader/FormHeader'
import { ITxTemplateInfo } from 'components/TransactionInfo/TransactionInfo'
import { TxStatusView } from 'components/TxStatusView/TxStatusView'
import { BigNumber } from 'ethers'
import { ThemeColors } from 'theme/styled'
import { ZERO } from 'utils/isZero'

export const BridgeHeader = () => (
  <FormHeader icon={bridgeIcon} label="Bridge" explanation="Bridge your tokens between different chains" />
)

export const PendingBridgeView = ({
  onBack,
  amount = ZERO,
  token = TokenSymbol.xfi,
  color,
  hash,
  txInfo,
}: {
  onBack: () => void
  amount?: BigNumber
  color: ThemeColors
  hash: string
  token: TokenSmallBadgeVariant
  txInfo?: ITxTemplateInfo
}) => {
  return (
    <TxStatusView header={<BridgeHeader />} txInfo={txInfo} amount={amount} color={color} hash={hash} token={token}>
      <ButtonViolet marginTop="16px" onClick={onBack}>
        New Bridge
      </ButtonViolet>
    </TxStatusView>
  )
}
