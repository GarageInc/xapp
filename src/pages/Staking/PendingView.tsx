import stakingIcon from 'assets/images/menu/staking.svg'
import { ButtonDarkOrange } from 'components/Button'
import { FormHeader } from 'components/FormHeader/FormHeader'
import { TxStatusView } from 'components/TxStatusView/TxStatusView'
import { BigNumber } from 'ethers'
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
  color: string
  bg: string
  hash: string
  token: string
}) => {
  return (
    <TxStatusView
      header={<StakingHeader />}
      onBack={onBack}
      amount={amount}
      color={color}
      bg={bg}
      hash={hash}
      token={token}
    >
      <ButtonDarkOrange marginTop="16px" onClick={onBack}>
        New Swap
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
  color: string
  bg: string
  hash: string
  token: string
}) => {
  return (
    <TxStatusView
      header={<StakingHeader />}
      onBack={onBack}
      amount={amount}
      color={color}
      bg={bg}
      hash={hash}
      token={token}
    >
      <ButtonDarkOrange marginTop="16px" onClick={onBack}>
        New Swap
      </ButtonDarkOrange>
    </TxStatusView>
  )
}
