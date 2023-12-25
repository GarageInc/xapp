import stakingIcon from 'assets/images/menu/staking.svg'
import { AppToggler } from 'components/AppToggler/AppToggler'
import { ApyBlock } from 'components/ApyBlock/ApyBlock'
import { CardCenteredGap } from 'components/Card'
import { Row } from 'components/Row'
import { StakingOverview } from 'components/StakingOverview/StakingOverview'
import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'

import { PendingStakeView, PendingUnStakeView, StakingExplanation } from './PendingView'
import { StakeBlock } from './StakeBlock'
import { Divider, Header, Icon, PageWrapper, SwapLabel } from './styled'
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
  const [pendingUnstakeTx, setPendingUnstakeTx] = useState<string | undefined>('123123123')

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
        bg="appViolet25"
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
        bg="appViolet25"
        hash={pendingStakeTx}
        token="lpXFI"
      />
    )
  }

  return (
    <PageWrapper>
      <CardCenteredGap gap="16px">
        <Header>
          <Row>
            <Icon src={stakingIcon}></Icon>
            <SwapLabel>Stake</SwapLabel>
          </Row>

          <StakingExplanation />
        </Header>

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
    </PageWrapper>
  )
}
