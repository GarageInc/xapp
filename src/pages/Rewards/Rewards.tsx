import { TransactionResponse } from '@ethersproject/providers'
import { ConfirmInWalletBlock } from 'components/Approval/ApproveTx'
import { AmountInputWithMax } from 'components/blocks/AmountInput/AmountInput'
import { TokenSymbol } from 'components/blocks/AmountInput/useAppCoins'
import { ButtonPrimary } from 'components/Button'
import { CardCenteredGap, GreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import { FormPageWrapper } from 'components/Forms/styled'
import Loading from 'components/Loading'
import { useStakingResults } from 'components/StakingOverview/StakingOverview'
import { TransactionInfo } from 'components/TransactionInfo/TransactionInfo'
import { useStakingContract } from 'constants/app-contracts'
import { TxTemplateTypes } from 'constants/transactions'
import { BigNumber } from 'ethers'
import { useTxTemplate } from 'hooks/base/tx-template'
import { useCallback, useState } from 'react'
import { TYPE } from 'theme/theme'
import { ZERO } from 'utils/isZero'
import { formatDecimal } from 'utils/numberWithCommas'

import { PendingRewardsView, RewardsHeader } from './PendingView'

const useClaimRewards = (value: BigNumber = ZERO, setPendingTx: (v: string) => void) => {
  const contract = useStakingContract()

  const dataFunc = useCallback(async () => {
    return await contract?.populateTransaction.getReward()
  }, [contract])

  const setTx = useCallback(
    (tx: TransactionResponse) => {
      setPendingTx(tx.hash)
    },
    [setPendingTx]
  )

  return useTxTemplate(
    TxTemplateTypes.Claimed,
    `$claim_staking_rewards`,
    `Claimed ${formatDecimal(value)} staking rewards`,
    dataFunc,
    setTx
  )
}

const defaultRightToken = {
  symbol: TokenSymbol.weth,
}

export default function Rewards() {
  const { wethEarned } = useStakingResults()

  const noValue = wethEarned.isZero()
  const [pendingTx, setPendingTx] = useState<string | undefined>('')

  const { pending, action, txInfo, calledWallet } = useClaimRewards(wethEarned, setPendingTx)

  if (pendingTx) {
    return (
      <PendingRewardsView
        onBack={() => setPendingTx('')}
        amount={wethEarned}
        color="orange"
        hash={pendingTx}
        token="weth"
        txInfo={txInfo}
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

        <TransactionInfo info={txInfo} />

        <ConfirmInWalletBlock calledWallet={calledWallet}>
          {noValue ? (
            <ButtonPrimary disabled={noValue}>No Rewards</ButtonPrimary>
          ) : (
            <ButtonPrimary onClick={action}>
              <Loading loading={pending} loadingLabel="Claiming">
                Get reward
              </Loading>
            </ButtonPrimary>
          )}
        </ConfirmInWalletBlock>
      </CardCenteredGap>
    </FormPageWrapper>
  )
}
