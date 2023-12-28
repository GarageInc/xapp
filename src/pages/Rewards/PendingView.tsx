import rewardsIcon from 'assets/images/menu/rewards.svg'
import { TokenSymbol } from 'components/blocks/AmountInput/useAppCoins'
import { ButtonOrange } from 'components/Button'
import { FormHeader } from 'components/FormHeader/FormHeader'
import { TokenSmallBadgeVariant } from 'components/TokenSmallBadge/TokenSmallBadge'
import { ITxTemplateInfo } from 'components/TransactionInfo/TransactionInfo'
import { TxStatusView } from 'components/TxStatusView/TxStatusView'
import { BigNumber } from 'ethers'
import { ThemeColors } from 'theme/styled'
import { ZERO } from 'utils/isZero'

export const RewardsHeader = () => (
  <FormHeader icon={rewardsIcon} label="Rewards" explanation="Claim WETH Rewards from LayerZero Comissions" />
)

export const PendingRewardsView = ({
  onBack,
  amount = ZERO,
  color,
  hash,
  token = TokenSymbol.weth,
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
    <TxStatusView header={<RewardsHeader />} amount={amount} color={color} hash={hash} token={token} txInfo={txInfo}>
      <ButtonOrange marginTop="16px" onClick={onBack}>
        Claim more ETH
      </ButtonOrange>
    </TxStatusView>
  )
}
