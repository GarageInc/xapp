import { TransactionResponse } from '@ethersproject/providers'
import stakedAmountSvg from 'assets/icons/staked-amount.svg'
import { ConfirmInWalletBlock } from 'components/Approval/ApproveTx'
import { AmountInputWithMax } from 'components/blocks/AmountInput/AmountInput'
import { ButtonPrimary } from 'components/Button'
import { GreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import { FormActionBtn } from 'components/FormActionBtn/FormActionBtn'
import { TransactionInfo } from 'components/TransactionInfo/TransactionInfo'
import { WarningBlock } from 'components/WarningBlock/WarningBlock'
import { useStakingContract } from 'constants/app-contracts'
import { TxTemplateTypes } from 'constants/transactions'
import { BigNumber } from 'ethers'
import { useTxTemplate } from 'hooks/base/tx-template'
import { useBalance, useDecimals } from 'hooks/base/useBalance'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback, useMemo } from 'react'
import { ZERO } from 'utils/isZero'
import { formatDecimal } from 'utils/numberWithCommas'

import { defaultRightToken, STAKING_TOKENS } from './StakeBlock'

const useUnStaking = (amount: BigNumber | undefined, setPendingUnstakeTx: (v: string) => void) => {
  const contract = useStakingContract()

  const value = useMemo(() => (amount ? amount : ZERO), [amount])

  const dataFunc = useCallback(async () => {
    return await contract?.populateTransaction.withdraw(value)
  }, [contract, value])

  const setTx = useCallback(
    (tx: TransactionResponse) => {
      setPendingUnstakeTx(tx.hash)
    },
    [setPendingUnstakeTx]
  )

  return useTxTemplate(
    TxTemplateTypes.Unstaked,
    `$unstake_${value.toString()}`,
    `Withdraw ${formatDecimal(value)} lpXFI from staking`,
    dataFunc,
    setTx
  )
}

export const UnstakeBlock = ({
  setPendingUnstakeTx,
  amount,
  setAmount,
}: {
  setPendingUnstakeTx: (v: string) => void
  amount?: BigNumber
  setAmount: (v?: BigNumber) => void
}) => {
  const { account } = useActiveWeb3React()

  const contract = useStakingContract()

  const balance = useBalance(contract, account)

  const decimals = useDecimals(contract)

  const noValue = !amount || amount.isZero()

  const { pending, action, txInfo, calledWallet } = useUnStaking(amount, setPendingUnstakeTx)

  return (
    <>
      <AutoColumn gap="16px">
        <GreyCard>
          <AmountInputWithMax
            inputValue={amount}
            setInputValue={(v) => v && setAmount(v)}
            decimals={decimals}
            maxValue={balance}
            rightTokenOptions={STAKING_TOKENS}
            rightToken={defaultRightToken}
            bgColor="appViolet25"
            walletIcon={stakedAmountSvg}
          />
        </GreyCard>
      </AutoColumn>

      <TransactionInfo info={txInfo} />

      <WarningBlock text="Your Bonus points will be burned and you will loose busted APY" />

      <ConfirmInWalletBlock calledWallet={calledWallet}>
        {noValue ? (
          <ButtonPrimary disabled={noValue}>Enter an amount</ButtonPrimary>
        ) : (
          <ButtonPrimary onClick={action}>
            <FormActionBtn pending={pending} txInfo={txInfo} labelActive="Unstake" labelInProgress="Unstaking" />
          </ButtonPrimary>
        )}
      </ConfirmInWalletBlock>
    </>
  )
}
