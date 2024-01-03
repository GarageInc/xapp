import stakingIcon from 'assets/images/menu/staking.svg'
import { TokenSmallBadgeVariant } from 'components/badges/TokenSmallBadge/TokenSmallBadge'
import { TokenSymbol } from 'components/blocks/AmountInput/useAppCoins'
import { ButtonDarkOrange } from 'components/Button'
import { FormHeader } from 'components/FormHeader/FormHeader'
import { TxStatusView } from 'components/TxStatusView/TxStatusView'
import { BigNumber } from 'ethers'
import { ThemeColors } from 'theme/styled'
import { ZERO } from 'utils/isZero'

export const StakingHeader = () => (
  <FormHeader icon={stakingIcon} label="Stake" explanation="Stake lpXFI for esXFI Rewards and ETH Rewards" />
)

export const PendingStakeView = ({
  onBack,
  amount = ZERO,
  token = TokenSymbol.lpXFI,
  color,
  hash,
}: {
  onBack: () => void
  amount?: BigNumber
  color: ThemeColors
  hash: string
  token: TokenSmallBadgeVariant
}) => {
  return (
    <TxStatusView header={<StakingHeader />} amount={amount} color={color} hash={hash} token={token}>
      <ButtonDarkOrange marginTop="16px" onClick={onBack}>
        New Stake
      </ButtonDarkOrange>
    </TxStatusView>
  )
}

export const PendingUnStakeView = ({
  onBack,
  amount = ZERO,
  color,
  hash,
  token = TokenSymbol.lpXFI,
}: {
  onBack: () => void
  amount?: BigNumber
  color: ThemeColors
  hash: string
  token: TokenSmallBadgeVariant
}) => {
  return (
    <TxStatusView header={<StakingHeader />} amount={amount} color={color} hash={hash} token={token}>
      <ButtonDarkOrange marginTop="16px" onClick={onBack}>
        Unstake more
      </ButtonDarkOrange>
    </TxStatusView>
  )
}
