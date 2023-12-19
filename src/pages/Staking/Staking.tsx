import stakingIcon from 'assets/images/menu/staking.svg'
import { AppToggler } from 'components/AppToggler/AppToggler'
import { ApyBlock } from 'components/ApyBlock/ApyBlock'
import { AmountInputWithMax } from 'components/blocks/AmountInput'
import { ButtonPrimary } from 'components/Button'
import { CardCenteredGap, GreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import { ExplanationBtn } from 'components/ExplanationBtn/ExplanationBtn'
import { Row } from 'components/Row'
import { StakingOverview } from 'components/StakingOverview/StakingOverview'
import { WarningBlock } from 'components/WarningBlock/WarningBlock'
import { BigNumber } from 'ethers'
import { useCallback, useState } from 'react'

import { PendingStakeView, PendingUnStakeView } from './PendingView'
import { Divider, Header, Icon, PageWrapper, SwapLabel } from './styled'

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

  const [pendingStakeTx, setPendingStakeTx] = useState<string | undefined>('test')
  const [pendingUnstakeTx, setPendingUnstakeTx] = useState<string | undefined>('test')

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

const StakeBlock = () => {
  const [amountFirst, setAmountFirst] = useState<number | undefined>()

  const onMaxHandlerFirst = useCallback(() => {
    setAmountFirst(100)
  }, [])

  return (
    <>
      <AutoColumn>
        <GreyCard>
          <AmountInputWithMax
            value={amountFirst}
            onUserInput={(v) => v && setAmountFirst(+v)}
            onMaxClicked={onMaxHandlerFirst}
            decimals={18}
            maxValue={BigNumber.from(100)}
          />
        </GreyCard>
      </AutoColumn>

      <ButtonPrimary disabled={amountFirst === 0}>Enter an amount</ButtonPrimary>
    </>
  )
}

const UnstakeBlock = () => {
  const [amountFirst, setAmountFirst] = useState<number | undefined>()

  const onMaxHandlerFirst = useCallback(() => {
    setAmountFirst(100)
  }, [])

  return (
    <>
      <AutoColumn gap="16px">
        <GreyCard>
          <AmountInputWithMax
            value={amountFirst}
            onUserInput={(v) => v && setAmountFirst(+v)}
            onMaxClicked={onMaxHandlerFirst}
            decimals={18}
            maxValue={BigNumber.from(100)}
          />
        </GreyCard>

        <GreyCard gap="16px">
          <AmountInputWithMax value={amountFirst} decimals={18} maxValue={BigNumber.from(100)} />
          <AmountInputWithMax value={amountFirst} decimals={18} maxValue={BigNumber.from(100)} />
        </GreyCard>
      </AutoColumn>

      <WarningBlock text="Your Bonus points will be burned and you will loose busted APY" />

      <ButtonPrimary disabled={amountFirst === 0}>Enter an amount</ButtonPrimary>
    </>
  )
}
