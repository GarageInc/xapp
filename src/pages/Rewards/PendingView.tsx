import rewardsIcon from 'assets/images/menu/rewards.svg'
import { ButtonOrange } from 'components/Button'
import { FormHeader } from 'components/FormHeader/FormHeader'
import { ITxTemplateInfo } from 'components/TransactionInfo/TransactionInfo'
import { TxStatusView } from 'components/TxStatusView/TxStatusView'
import { BigNumber } from 'ethers'
import { ZERO } from 'utils/isZero'

export const RewardsHeader = () => (
  <FormHeader icon={rewardsIcon} label="Rewards" explanation="Claim WETH Rewards from LayerZero Comissions" />
)

export const PendingRewardsView = ({
  onBack,
  amount = ZERO,
  color,
  bg,
  hash,
  token = 'WETH',
  txInfo,
}: {
  onBack: () => void
  amount?: BigNumber
  color: string
  bg: string
  hash: string
  token: string
  txInfo?: ITxTemplateInfo
}) => {
  return (
    <TxStatusView
      header={<RewardsHeader />}
      onBack={onBack}
      amount={amount}
      color={color}
      bg={bg}
      hash={hash}
      token={token}
      txInfo={txInfo}
    >
      <ButtonOrange marginTop="16px" onClick={onBack}>
        Claim more ETH
      </ButtonOrange>
    </TxStatusView>
  )
}
