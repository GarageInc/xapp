import { AppGetSwitcher } from 'components/AppGetSwitcher/AppGetSwitcher'
import { ConfirmInWalletBlock } from 'components/Approval/ApproveTx'
import { AmountInputWithMax } from 'components/blocks/AmountInput/AmountInput'
import { TokenSymbol } from 'components/blocks/AmountInput/useAppCoins'
import { ButtonViolet } from 'components/Button'
import { CardCenteredGap, GreyCard } from 'components/Card'
import { FormActionBtn } from 'components/FormActionBtn/FormActionBtn'
import { TransactionInfo } from 'components/TransactionInfo/TransactionInfo'
import { useLayerZeroErc20Contract } from 'constants/app-contracts'
import { SupportedChainId } from 'constants/chainsinfo'
import { BigNumber } from 'ethers'
import { useBalance } from 'hooks/base/useBalance'
import { useLayerZeroErc20Bridge } from 'hooks/useMultichainBridge'
import { useActiveWeb3React } from 'hooks/web3'
import { useState } from 'react'
import { TYPE } from 'theme/theme'

import { BridgeHeader, PendingBridgeView } from './PendingView'
import { PageWrapper } from './styled'

const defaultRightToken = {
  symbol: TokenSymbol.xfi,
}

export default function Bridge() {
  const contract = useLayerZeroErc20Contract()

  const { chainId: fromChain = SupportedChainId.BNB, account } = useActiveWeb3React()

  const balance = useBalance(contract, account)
  const [amount, setAmount] = useState<BigNumber | undefined>(undefined)

  const noValue = !amount || amount.isZero()

  const [pendingTx, setPendingTx] = useState<string | undefined>('')

  const [toChain, setToChain] = useState<number>(SupportedChainId.ARBITRUM_ONE)

  const { pending, action, txInfo, calledWallet } = useLayerZeroErc20Bridge(toChain, amount, setPendingTx)

  if (pendingTx) {
    return (
      <PendingBridgeView
        onBack={() => setPendingTx('')}
        amount={amount}
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

        <AppGetSwitcher
          mainColor="appViolet"
          subColor="appViolet35"
          bgColor="appViolet15"
          fromChainId={fromChain}
          toChainId={toChain}
          setToChainId={setToChain}
          onUserInput={setAmount}
        />

        <GreyCard gap="16px">
          <TYPE.body fontWeight={400} color="dark40">
            Heading
          </TYPE.body>

          <AmountInputWithMax
            inputValue={amount}
            setInputValue={(v) => v && setAmount(v)}
            decimals={18}
            maxValue={balance}
            rightToken={defaultRightToken}
            bgColor="main15"
          />
        </GreyCard>

        <TransactionInfo info={txInfo} />

        <ConfirmInWalletBlock calledWallet={calledWallet}>
          {noValue ? (
            <ButtonViolet disabled={noValue}>Enter an amount</ButtonViolet>
          ) : (
            <ButtonViolet onClick={action}>
              <FormActionBtn pending={pending} txInfo={txInfo} labelActive="Bridge" labelInProgress="Bridging" />
            </ButtonViolet>
          )}
        </ConfirmInWalletBlock>
      </CardCenteredGap>
    </PageWrapper>
  )
}
