import { TransactionResponse } from '@ethersproject/providers'
import walletSvg from 'assets/icons/wallet.svg'
import { ConfirmInWalletBlock } from 'components/Approval/ApproveTx'
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
import { Duration, intervalToDuration } from 'date-fns'
import { BigNumber } from 'ethers'
import { useTxTemplate } from 'hooks/base/tx-template'
import ms from 'ms'
import VestingStatus from 'pages/Escrow/VestingStatus'
import { useCallback, useMemo, useState } from 'react'
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

const ClaimingBlock = () => {
  const [pendingTx, setPendingTx] = useState<string | undefined>('')

  const { esXfiEarned } = useStakingResults()

  const { pending, action, txInfo, calledWallet } = useClaimRewards(esXfiEarned, setPendingTx)

  const calculatedTime = useMemo(() => {
    let timeLeft: Duration = { seconds: 0 }

    if (vestingStartTime) {
      const endTime = vestingStartTime + ms(`1y`)

      if (endTime <= Date.now()) {
        timeLeft = { seconds: 0 }
      } else {
        timeLeft = intervalToDuration({ start: Date.now(), end: endTime })
      }
    }
    return timeLeft
  }, [])

  const noValue = esXfiEarned.isZero()

  return (
    <>
      <AutoColumn gap="16px">
        {pendingTx ? (
          <TxStatusView
            amount={esXfiEarned}
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
                disabled
              />
            </GreyCard>

            <ConfirmInWalletBlock calledWallet={calledWallet}>
              {noValue ? (
                <ButtonPurple disabled={noValue}>No Rewards</ButtonPurple>
              ) : (
                <ButtonPurple disabled={pending || esXfiEarned.isZero()} onClick={action}>
                  <FormActionBtn pending={pending} txInfo={txInfo} labelActive="Claim" labelInProgress="Claiming" />
                </ButtonPurple>
              )}
            </ConfirmInWalletBlock>

            <TransactionInfo info={txInfo} />

            <Divider />

            <VestingStatus
              xfiAmount={ZERO}
              esXfiAmount={ZERO}
              isEsXfiLoading={false}
              timeLeft={formattedDuration(calculatedTime)}
            />
          </>
        )}
      </AutoColumn>
    </>
  )
}

export default ClaimingBlock
