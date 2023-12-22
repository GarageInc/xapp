import rewardsIcon from 'assets/images/menu/rewards.svg'
import { AmountInputWithMax } from 'components/blocks/AmountInput/AmountInput'
import { ButtonPrimary } from 'components/Button'
import { CardCenteredGap, GreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import { ExplanationBtn } from 'components/ExplanationBtn/ExplanationBtn'
import Loading from 'components/Loading'
import { Row } from 'components/Row'
import { useStakingResults } from 'components/StakingOverview/StakingOverview'
import { useStakingContract } from 'constants/app-contracts'
import { useTxTemplate } from 'hooks/base/tx-template'
import { useCallback } from 'react'
import { TYPE } from 'theme/theme'

import { Header, Icon, PageWrapper, SwapLabel } from './styled'

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

  return (
    <PageWrapper>
      <CardCenteredGap gap="16px">
        <Header>
          <Row>
            <Icon src={rewardsIcon}></Icon>
            <SwapLabel>Rewards</SwapLabel>
          </Row>

          <ExplanationBtn title="Claim WETH Rewards from LayerZero Comissions" />
        </Header>

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
    </PageWrapper>
  )
}
