import stakingIcon from 'assets/images/menu/staking.svg'
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
  token = 'lpXFI',
  color,
  bg,
  hash,
}: {
  onBack: () => void
  amount?: BigNumber
  color: ThemeColors
  bg: ThemeColors
  hash: string
  token: string
}) => {
  return (
    <TxStatusView header={<StakingHeader />} amount={amount} color={color} bg={bg} hash={hash} token={token}>
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
  bg,
  hash,
  token = 'lpXFI',
}: {
  onBack: () => void
  amount?: BigNumber
  color: ThemeColors
  bg: ThemeColors
  hash: string
  token: string
}) => {
  return (
    <TxStatusView header={<StakingHeader />} amount={amount} color={color} bg={bg} hash={hash} token={token}>
      <ButtonDarkOrange marginTop="16px" onClick={onBack}>
        Unstake more
      </ButtonDarkOrange>
    </TxStatusView>
  )
}
