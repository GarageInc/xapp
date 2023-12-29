import { TransactionResponse } from '@ethersproject/providers'
import { ApproveCheckerStaking, ConfirmInWalletBlock } from 'components/Approval/ApproveTx'
import { AmountInputWithMax } from 'components/blocks/AmountInput/AmountInput'
import { TokenSymbol } from 'components/blocks/AmountInput/useAppCoins'
import { ButtonPrimary } from 'components/Button'
import { GreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import { FormActionBtn } from 'components/FormActionBtn/FormActionBtn'
import { TransactionInfo } from 'components/TransactionInfo/TransactionInfo'
import { useStakingContract, useStakingLPContract } from 'constants/app-contracts'
import { TxTemplateTypes } from 'constants/transactions'
import { BigNumber } from 'ethers'
import { useTxTemplate } from 'hooks/base/tx-template'
import { useBalance, useDecimals } from 'hooks/base/useBalance'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback, useMemo } from 'react'
import { ZERO } from 'utils/isZero'
import { formatDecimal } from 'utils/numberWithCommas'

export const STAKING_TOKENS = [TokenSymbol.lpXFI].map((token) => ({
  symbol: token,
}))

export const defaultRightToken = STAKING_TOKENS[0]

const useStaking = (amount: BigNumber | undefined, setPendingTx: (v: string) => void) => {
  const contract = useStakingContract()

  const value = useMemo(() => (amount ? amount : ZERO), [amount])

  const dataFunc = useCallback(async () => {
    return await contract?.populateTransaction.stake(value)
  }, [contract, value])

  const setTx = useCallback(
    (tx: TransactionResponse) => {
      setPendingTx(tx.hash)
    },
    [setPendingTx]
  )

  return useTxTemplate(
    TxTemplateTypes.Staking,
    `$stake_${value.toString()}`,
    `Staked ${formatDecimal(value)} lpXFI`,
    dataFunc,
    setTx
  )
}

export const StakeBlock = ({
  setPendingTx,
  amount,
  setAmount,
}: {
  setPendingTx: (v: string) => void
  amount?: BigNumber
  setAmount: (v?: BigNumber) => void
}) => {
  const { account } = useActiveWeb3React()

  const contract = useStakingLPContract()
  const balance = useBalance(contract, account)
  const decimals = useDecimals(contract)

  const noValue = !amount || amount.isZero()

  const { pending, action, txInfo, calledWallet } = useStaking(amount, setPendingTx)

  return (
    <>
      <AutoColumn>
        <GreyCard>
          <AmountInputWithMax
            inputValue={amount}
            setInputValue={(v) => v && setAmount(v)}
            decimals={decimals}
            maxValue={balance}
            rightTokenOptions={STAKING_TOKENS}
            rightToken={defaultRightToken}
            bgColor="appViolet25"
          />
        </GreyCard>
      </AutoColumn>

      <TransactionInfo info={txInfo} />

      <ApproveCheckerStaking border={balance}>
        <ConfirmInWalletBlock calledWallet={calledWallet}>
          {noValue ? (
            <ButtonPrimary disabled={noValue}>Enter an amount</ButtonPrimary>
          ) : (
            <ButtonPrimary onClick={action}>
              <FormActionBtn pending={pending} txInfo={txInfo} labelActive="Stake" labelInProgress="Staking" />
            </ButtonPrimary>
          )}
        </ConfirmInWalletBlock>
      </ApproveCheckerStaking>
    </>
  )
}
