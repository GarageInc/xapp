import stakingIcon from 'assets/images/menu/staking.svg'
import { AppToggler } from 'components/AppToggler/AppToggler'
import { ApyBlock } from 'components/ApyBlock/ApyBlock'
import { CardCenteredGap } from 'components/Card'
import { ExplanationBtn } from 'components/ExplanationBtn/ExplanationBtn'
import { Row } from 'components/Row'
import { StakingOverview } from 'components/StakingOverview/StakingOverview'
import { useState } from 'react'

import { PendingStakeView, PendingUnStakeView } from './PendingView'
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
  const [pendingUnstakeTx, setPendingUnstakeTx] = useState<string | undefined>('')

  if (pendingUnstakeTx) {
    return <PendingUnStakeView onNewSwap={() => setPendingUnstakeTx('')} />
  }

  if (pendingStakeTx) {
    return <PendingStakeView onNewSwap={() => setPendingStakeTx('')} />
  }

  return (
    <PageWrapper>
      <CardCenteredGap gap="16px">
        <Header>
          <Row>
            <Icon src={stakingIcon}></Icon>
            <SwapLabel>Stake</SwapLabel>
          </Row>

          <ExplanationBtn title="Stake lpXFI for esXFI Rewards and ETH Rewards" />
        </Header>

        <AppToggler tab={tab} setTab={setTab} tabs={TABS} />

        {tab === TAB_IDS.STAKE ? <StakeBlock /> : <UnstakeBlock />}

        <Divider />

        <ApyBlock />

        <Divider />

        <StakingOverview />
      </CardCenteredGap>
    </PageWrapper>
  )
}
