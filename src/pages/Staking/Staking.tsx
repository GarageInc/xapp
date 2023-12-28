import { AppToggler } from 'components/AppToggler/AppToggler'
import { ApyBlock } from 'components/ApyBlock/ApyBlock'
import { CardCenteredGap } from 'components/Card'
import { FormPageWrapper } from 'components/Forms/styled'
import { StakingOverview } from 'components/StakingOverview/StakingOverview'
import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'

import { PendingStakeView, PendingUnStakeView, StakingHeader } from './PendingView'
import { StakeBlock } from './StakeBlock'
import { Divider } from './styled'
import { UnstakeBlock } from './UnstakeBlock'

const TAB_IDS = {
  STAKE: 'stake',
  UNSTAKE: 'unstake',
}

const TABS = [
  {
    id: TAB_IDS.STAKE,
    title: 'Stake',
  },
  {
    id: TAB_IDS.UNSTAKE,
    title: 'Unstake',
  },
]

export default function Staking() {
  const [tab, setTab] = useState<string>(TABS[0].id)

  const [pendingStakeTx, setPendingStakeTx] = useState<string | undefined>('')
  const [pendingUnstakeTx, setPendingUnstakeTx] = useState<string | undefined>('')

  const [amount, setAmount] = useState<BigNumber | undefined>()

  useEffect(() => {
    setAmount(undefined)
  }, [tab])

  if (pendingUnstakeTx) {
    return (
      <PendingUnStakeView
        onBack={() => setPendingUnstakeTx('')}
        amount={amount}
        color="appViolet"
        hash={pendingUnstakeTx}
        token="lpXFI"
      />
    )
  }

  if (pendingStakeTx) {
    return (
      <PendingStakeView
        onBack={() => setPendingStakeTx('')}
        amount={amount}
        color="appViolet"
        hash={pendingStakeTx}
        token="lpXFI"
      />
    )
  }

  return (
    <FormPageWrapper>
      <CardCenteredGap gap="16px">
        <StakingHeader />

        <AppToggler tab={tab} setTab={setTab} tabs={TABS} />

        {tab === TAB_IDS.STAKE ? (
          <StakeBlock setPendingTx={setPendingStakeTx} amount={amount} setAmount={setAmount} />
        ) : (
          <UnstakeBlock setPendingUnstakeTx={setPendingUnstakeTx} amount={amount} setAmount={setAmount} />
        )}

        <Divider />

        <ApyBlock />

        <Divider />

        <StakingOverview />
      </CardCenteredGap>
    </FormPageWrapper>
  )
}
