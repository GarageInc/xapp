import { AppGetSwitcher } from 'components/AppGetSwitcher/AppGetSwitcher'
import { ApproveCheckerLayerZero, ConfirmInWalletBlock } from 'components/Approval/ApproveTx'
import { AmountInputWithMax } from 'components/blocks/AmountInput/AmountInput'
import { ButtonViolet } from 'components/Button'
import { CardCenteredGap, GreyCard } from 'components/Card'
import { FormActionBtn } from 'components/FormActionBtn/FormActionBtn'
import { TransactionInfo } from 'components/TransactionInfo/TransactionInfo'
import { BigNumber } from 'ethers'
import { useLayerZeroErc20Bridge } from 'hooks/useMultichainBridge'
import { useState } from 'react'
import { TYPE } from 'theme/theme'

import { BridgeHeader, PendingBridgeView } from './PendingView'
import { PageWrapper } from './styled'

export default function Bridge() {
  const tokenAddress = ''
  const [amountFirst, setAmountFirst] = useState<BigNumber | undefined>(undefined)

  const noValue = !amountFirst || amountFirst.isZero()

  const [pendingTx, setPendingTx] = useState<string | undefined>('')

  const { pending, action, txInfo, calledWallet } = useLayerZeroErc20Bridge(wethEarned, setPendingTx)

  if (pendingTx) {
    return (
      <PendingBridgeView
        onBack={() => setPendingTx('')}
        amount={amountFirst}
        color="appViolet"
        hash={pendingTx}
        token="weth"
        txInfo={txInfo}
      />
    )
  }

  return (
    <PageWrapper>
      <CardCenteredGap gap="16px">
        <BridgeHeader />

        <AppGetSwitcher mainColor="appViolet" subColor="appViolet35" bgColor="appViolet15" />

        <GreyCard gap="16px">
          <TYPE.body fontWeight={400} color="dark40">
            Heading
          </TYPE.body>

          <AmountInputWithMax
            inputValue={amountFirst}
            onUserInput={(v) => v && setAmountFirst(v)}
            decimals={18}
            maxValue={BigNumber.from(100)}
          />
        </GreyCard>

        <TransactionInfo info={txInfo} />

        <ApproveCheckerLayerZero tokenAddress={tokenAddress}>
          <ConfirmInWalletBlock calledWallet={calledWallet}>
            {noValue ? (
              <ButtonViolet disabled={noValue}>Enter an amount</ButtonViolet>
            ) : (
              <ButtonViolet onClick={action}>
                <FormActionBtn pending={pending} txInfo={txInfo} labelActive="Bridge" labelInProgress="Bridging" />
              </ButtonViolet>
            )}
          </ConfirmInWalletBlock>
        </ApproveCheckerLayerZero>
      </CardCenteredGap>
    </PageWrapper>
  )
}
