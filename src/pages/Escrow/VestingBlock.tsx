import { TransactionResponse } from '@ethersproject/providers'
import iconLp from 'assets/icons/tokens/lp.svg'
import walletSvg from 'assets/icons/wallet.svg'
import { ConfirmInWalletBlock } from 'components/Approval/ApproveTx'
import { AmountInputWithMax } from 'components/blocks/AmountInput/AmountInput'
import { TokenSymbol } from 'components/blocks/AmountInput/useAppCoins'
import { ButtonPurple } from 'components/Button'
import { GreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import EarnedToken from 'components/EarnedToken/EarnedToken'
import { FormActionBtn } from 'components/FormActionBtn/FormActionBtn'
import { Divider } from 'components/MUI'
import { useStakingResults } from 'components/StakingOverview/StakingOverview'
import { TransactionInfo } from 'components/TransactionInfo/TransactionInfo'
import { TxStatusView } from 'components/TxStatusView/TxStatusView'
import { WarningBlock } from 'components/WarningBlock/WarningBlock'
import { useStakingContract } from 'constants/app-contracts'
import { TxTemplateTypes } from 'constants/transactions'
import { BigNumber } from 'ethers'
import { useTxTemplate } from 'hooks/base/tx-template'
import { useCallback, useMemo, useState } from 'react'
import { TYPE } from 'theme/theme'
import { ZERO } from 'utils/isZero'
import { formatDecimal } from 'utils/numberWithCommas'

const useVest = (amount: BigNumber | undefined, setPendingTx: (v: string) => void) => {
  const contract = useStakingContract()

  const value = useMemo(() => (amount ? amount : ZERO), [amount])

  const dataFunc = useCallback(async () => {
    return await contract?.populateTransaction.vest(value)
  }, [contract, value])

  const setTx = useCallback(
    (tx: TransactionResponse) => {
      setPendingTx(tx.hash)
    },
    [setPendingTx]
  )

  return useTxTemplate(
    TxTemplateTypes.Staking,
    `$vest_${value.toString()}`,
    `Vested ${formatDecimal(value)} esXFI`,
    dataFunc,
    setTx
  )
}

const VestingBlock = ({ amount, setAmount }: { amount?: BigNumber; setAmount: (v?: BigNumber) => void }) => {
  const [pendingTx, setPendingTx] = useState<string | undefined>('')

  const { esXfiEarned: balance, lpXfiStaked, loading } = useStakingResults()

  const { pending, action, txInfo, calledWallet } = useVest(amount, setPendingTx)

  const noValue = !amount || amount.isZero()

  return (
    <>
      <AutoColumn gap="16px">
        {pendingTx ? (
          <TxStatusView
            amount={amount}
            isLoading={pending}
            processLabel="You are starting to vest"
            completedLabel="Vesting has started!"
            color="fuchsia"
            hash={pendingTx}
            token="esXFI"
          />
        ) : (
          <>
            <GreyCard gap="16px">
              <TYPE.body fontWeight={400} color="dark40">
                You vest
              </TYPE.body>
              <AmountInputWithMax
                inputValue={amount}
                setInputValue={(v) => v && setAmount(v)}
                decimals={18}
                maxValue={balance}
                rightTokenOptions={VESTING_TOKENS}
                rightToken={VESTING_TOKENS[0]}
                bgColor="fuchsia15"
                walletIcon={walletSvg}
              />
            </GreyCard>

            <WarningBlock text="When you begin vesting esXFI it will no longer generate rewards" />

            <ConfirmInWalletBlock calledWallet={calledWallet}>
              {noValue ? (
                <ButtonPurple disabled={noValue}>Enter an amount</ButtonPurple>
              ) : (
                <ButtonPurple onClick={action}>
                  <FormActionBtn pending={pending} txInfo={txInfo} labelActive="Vest" labelInProgress="Vesting" />
                </ButtonPurple>
              )}
            </ConfirmInWalletBlock>
          </>
        )}

        <TransactionInfo info={txInfo} />

        <Divider />

        <EarnedToken
          icon={iconLp}
          label="lpXFI"
          labelColor="appViolet"
          bgColor="appViolet15"
          isLoading={loading}
          iconBgColor="appViolet15"
          amount={lpXfiStaked}
          amountTail={
            <TYPE.body fontWeight={500} color="appViolet50">
              Staked
            </TYPE.body>
          }
        />
      </AutoColumn>
    </>
  )
}

const VESTING_TOKENS = [TokenSymbol.esXFI].map((token) => ({
  symbol: token,
}))

export default VestingBlock
