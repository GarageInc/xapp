import stakedAmountSvg from 'assets/icons/staked-amount.svg'
import { AmountInputWithMax } from 'components/blocks/AmountInput/AmountInput'
import { ButtonPrimary } from 'components/Button'
import { GreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import Loading from 'components/Loading'
import { WarningBlock } from 'components/WarningBlock/WarningBlock'
import { useStakingContract } from 'constants/app-contracts'
import { BigNumber } from 'ethers'
import { useTxTemplate } from 'hooks/base/tx-template'
import { useBalance, useDecimals } from 'hooks/base/useBalance'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback, useMemo, useState } from 'react'
import { ZERO } from 'utils/isZero'
import { formatDecimal } from 'utils/numberWithCommas'

import { defaultRightToken, STAKING_TOKENS } from './StakeBlock'

const useUnStaking = (amount: BigNumber | undefined) => {
  const contract = useStakingContract()

  const value = useMemo(() => (amount ? amount : ZERO), [amount])

  const dataFunc = useCallback(async () => {
    return await contract?.populateTransaction.withdraw(value)
  }, [contract, value])

  return useTxTemplate(`$unstake_${value.toString()}`, `Withdraw ${formatDecimal(value)} lpXFI from staking`, dataFunc)
}

export const UnstakeBlock = () => {
  const [amountFirst, setAmountFirst] = useState<BigNumber | undefined>()

  const { account } = useActiveWeb3React()

  const contract = useStakingContract()

  const balance = useBalance(contract, account)

  const decimals = useDecimals(contract)

  const noValue = !amountFirst || amountFirst.isZero()

  const { pending, action } = useUnStaking(amountFirst)

  return (
    <>
      <AutoColumn gap="16px">
        <GreyCard>
          <AmountInputWithMax
            inputValue={amountFirst}
            setInputValue={(v) => v && setAmountFirst(v)}
            decimals={decimals}
            maxValue={balance}
            rightTokenOptions={STAKING_TOKENS}
            rightToken={defaultRightToken}
            bgColor="appViolet25"
            walletIcon={stakedAmountSvg}
          />
        </GreyCard>
      </AutoColumn>

      <WarningBlock text="Your Bonus points will be burned and you will loose busted APY" />

      {noValue ? (
        <ButtonPrimary disabled={noValue}>Enter an amount</ButtonPrimary>
      ) : (
        <ButtonPrimary onClick={action}>
          <Loading loading={pending} loadingLabel="Unstaking">
            Unstake
          </Loading>
        </ButtonPrimary>
      )}
    </>
  )
}
