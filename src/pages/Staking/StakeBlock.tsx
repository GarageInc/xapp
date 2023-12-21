import { ApproveCheckerStaking } from 'components/Approval/ApproveTx'
import { AmountInputWithMax } from 'components/blocks/AmountInput/AmountInput'
import { ButtonPrimary } from 'components/Button'
import { GreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import Loading from 'components/Loading'
import { useStakingContract, useStakingLPContract } from 'constants/app-contracts'
import { BigNumber } from 'ethers'
import { useTxTemplate } from 'hooks/base/tx-template'
import { useBalance, useDecimals } from 'hooks/base/useBalance'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback, useMemo, useState } from 'react'
import { ZERO } from 'utils/isZero'
import { formatDecimal } from 'utils/numberWithCommas'

const STAKING_TOKENS = ['lpXFI'].map((token) => ({
  symbol: token,
}))

const defaultRightToken = STAKING_TOKENS[0]

const useStaking = (amount: BigNumber | undefined) => {
  const contract = useStakingContract()

  const value = useMemo(() => (amount ? amount : ZERO), [amount])

  const dataFunc = useCallback(async () => {
    return await contract?.populateTransaction.stake(value)
  }, [contract, value])

  return useTxTemplate(`$stake_${value.toString()}`, `Staked ${formatDecimal(value)} lpXFI`, dataFunc)
}

export const StakeBlock = () => {
  const [amountFirst, setAmountFirst] = useState<BigNumber | undefined>()

  const { account } = useActiveWeb3React()

  const contract = useStakingLPContract()
  const balance = useBalance(contract, account)
  const decimals = useDecimals(contract)

  const noValue = !amountFirst || amountFirst.isZero()

  const { pending, action } = useStaking(amountFirst)

  return (
    <>
      <AutoColumn>
        <GreyCard>
          <AmountInputWithMax
            inputValue={amountFirst}
            setInputValue={(v) => v && setAmountFirst(v)}
            decimals={decimals}
            maxValue={balance}
            rightTokenOptions={STAKING_TOKENS}
            rightToken={defaultRightToken}
            bgColor="appViolet25"
          />
        </GreyCard>
      </AutoColumn>

      <ApproveCheckerStaking border={balance}>
        {noValue ? (
          <ButtonPrimary disabled={noValue}>Enter an amount</ButtonPrimary>
        ) : (
          <ButtonPrimary onClick={action}>
            <Loading loading={pending} loadingLabel="Staking">
              Stake
            </Loading>
          </ButtonPrimary>
        )}
      </ApproveCheckerStaking>
    </>
  )
}
