import { TransactionResponse } from '@ethersproject/providers'
import walletSvg from 'assets/icons/wallet.svg'
import { ConfirmInWalletBlock } from 'components/Approval/ApproveTx'
import { SECONDS_IN_YEAR } from 'components/ApyBlock/ApyBlock'
import { AmountInputWithMax } from 'components/blocks/AmountInput/AmountInput'
import { TokenSymbol } from 'components/blocks/AmountInput/useAppCoins'
import { ButtonPurple } from 'components/Button'
import { GreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import { FormActionBtn } from 'components/FormActionBtn/FormActionBtn'
import { Divider } from 'components/MUI'
import { useStakingResults } from 'components/StakingOverview/StakingOverview'
import { TransactionInfo } from 'components/TransactionInfo/TransactionInfo'
import { TxStatusView } from 'components/TxStatusView/TxStatusView'
import { useStakingContract } from 'constants/app-contracts'
import { TxTemplateTypes } from 'constants/transactions'
import { intervalToDuration } from 'date-fns'
import { BigNumber } from 'ethers'
import { useTxTemplate } from 'hooks/base/tx-template'
import { useActiveWeb3React } from 'hooks/web3'
import ms from 'ms'
import VestingStatus from 'pages/Escrow/VestingStatus'
import { useCallback, useMemo, useState } from 'react'
import { useSingleCallResult } from 'state/multicall/hooks'
import { TYPE } from 'theme/theme'
import { formattedDuration } from 'utils/date'
import { ZERO } from 'utils/isZero'
import { formatDecimal } from 'utils/numberWithCommas'

const VESTING_TOKENS = [TokenSymbol.xfi].map((token) => ({
  symbol: token,
}))

const vestingStartTime = Date.now() - ms('120 days')

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
    `Claimed ${formatDecimal(value)} WETH staking rewards`,
    dataFunc,
    setTx
  )
}

const useVestingTime = () => {
  const contract = useStakingContract()
  const { account } = useActiveWeb3React()

  const deps = useMemo(() => [account], [account])
  const { loading, result } = useSingleCallResult(contract, 'userVariables', deps)

  const timeLeft = useMemo(() => {
    if (!result || loading) return undefined

    const { vestingFinishTime } = result

    return intervalToDuration({ start: Date.now(), end: vestingFinishTime })
  }, [result, loading])

  const percentsCompleted = useMemo(() => {
    if (!result || loading) return undefined

    const { vestingFinishTime } = result

    if (vestingFinishTime.isZero()) {
      return 0
    }

    const startTime = vestingFinishTime.toNumber() - SECONDS_IN_YEAR

    const completedFromStart = Date.now() / 1000 - startTime

    return (100 * completedFromStart) / SECONDS_IN_YEAR
  }, [result, loading])

  return {
    loading,
    timeLeft,
    percentsCompleted,
  }
}

const ClaimingBlock = () => {
  const { timeLeft, loading: loadingVestingTime, percentsCompleted } = useVestingTime()

  const [pendingTx, setPendingTx] = useState<string | undefined>('')

  const { balanceVST, vestingEarned, loading } = useStakingResults()

  const { pending, action, txInfo, calledWallet } = useClaimRewards(vestingEarned, setPendingTx)

  const noValue = vestingEarned.isZero()

  return (
    <>
      <AutoColumn gap="16px">
        {pendingTx ? (
          <TxStatusView
            amount={vestingEarned}
            isLoading={pending}
            color="fuchsia"
            hash={pendingTx}
            token="xfi"
            txInfo={txInfo}
          />
        ) : (
          <>
            <GreyCard gap="16px">
              <TYPE.body fontWeight={400} color="dark40">
                Claim
              </TYPE.body>
              <AmountInputWithMax
                decimals={18}
                rightTokenOptions={VESTING_TOKENS}
                rightToken={VESTING_TOKENS[0]}
                bgColor="main25"
                walletIcon={walletSvg}
                inputValue={vestingEarned}
                disabled
              />
            </GreyCard>

            <ConfirmInWalletBlock calledWallet={calledWallet}>
              {noValue ? (
                <ButtonPurple disabled={noValue}>No Rewards</ButtonPurple>
              ) : (
                <ButtonPurple disabled={pending || vestingEarned.isZero()} onClick={action}>
                  <FormActionBtn pending={pending} txInfo={txInfo} labelActive="Claim" labelInProgress="Claiming" />
                </ButtonPurple>
              )}
            </ConfirmInWalletBlock>

            <TransactionInfo info={txInfo} />

            <Divider />

            <VestingStatus
              xfiAmount={vestingEarned}
              esXfiAmount={balanceVST}
              isEsXfiLoading={loading || loadingVestingTime}
              percentsCompleted={percentsCompleted}
              timeLeft={timeLeft ? formattedDuration(timeLeft) : '0 days'}
            />
          </>
        )}
      </AutoColumn>
    </>
  )
}

export default ClaimingBlock
