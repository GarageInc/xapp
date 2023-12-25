import { AmountInputWithMax } from 'components/blocks/AmountInput/AmountInput'
import { ButtonPrimary } from 'components/Button'
import { CardCenteredGap, GreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import { FormPageWrapper } from 'components/Forms/styled'
import Loading from 'components/Loading'
import { useStakingResults } from 'components/StakingOverview/StakingOverview'
import { useStakingContract } from 'constants/app-contracts'
import { useTxTemplate } from 'hooks/base/tx-template'
import { useCallback, useState } from 'react'
import { TYPE } from 'theme/theme'

import { PendingRewardsView, RewardsHeader } from './PendingView'

const useClaimRewards = () => {
  const contract = useStakingContract()

  const dataFunc = useCallback(async () => {
    return await contract?.populateTransaction.getReward()
  }, [contract])

  return useTxTemplate(`$claim_staking_rewards`, `Claimed staking rewards`, dataFunc)
}

const defaultRightToken = {
  symbol: 'weth',
}

export default function Rewards() {
  const { wethEarned } = useStakingResults()

  const noValue = wethEarned.isZero()

  const { pending, action } = useClaimRewards()

  const [pendingTx, setPendingTx] = useState<string | undefined>('')

  if (pendingTx) {
    return (
      <PendingRewardsView
        onBack={() => setPendingTx('')}
        amount={wethEarned}
        color="orange"
        bg="orange25"
        hash={pendingTx}
        token="WETH"
      />
    )
  }

  return (
    <FormPageWrapper>
      <CardCenteredGap gap="16px">
        <RewardsHeader />

        <AutoColumn>
          <GreyCard gap="16px">
            <TYPE.body fontWeight={400} color="dark40">
              Claim
            </TYPE.body>

            <AmountInputWithMax
              showBalanceRow={false}
              inputValue={wethEarned}
              disabled
              rightToken={defaultRightToken}
              bgColor="main15"
              decimals={18}
            />
          </GreyCard>
        </AutoColumn>

        {noValue ? (
          <ButtonPrimary disabled={noValue}>No Rewards</ButtonPrimary>
        ) : (
          <ButtonPrimary onClick={action}>
            <Loading loading={pending} loadingLabel="Claiming">
              Get reward
            </Loading>
          </ButtonPrimary>
        )}
      </CardCenteredGap>
    </FormPageWrapper>
  )
}
