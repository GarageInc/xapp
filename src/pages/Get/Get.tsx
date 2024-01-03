import getIcon from 'assets/images/menu/get.svg'
import { AppGetSwitcher } from 'components/AppGetSwitcher/AppGetSwitcher'
import { AppToggler } from 'components/AppToggler/AppToggler'
import { AmountInputWithMax } from 'components/blocks/AmountInput/AmountInput'
import { TokenSymbol } from 'components/blocks/AmountInput/useAppCoins'
import { ButtonPrimary } from 'components/Button'
import { CardCenteredGap, GreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import { ExplanationBtn } from 'components/ExplanationBtn/ExplanationBtn'
import { GetOverview } from 'components/GetOverview/GetOverview'
import { Row } from 'components/Row'
import { WarningBlock } from 'components/WarningBlock/WarningBlock'
import { SupportedChainId } from 'constants/chainsinfo'
import { BigNumber } from 'ethers'
import { useActiveWeb3React } from 'hooks/web3'
import { useState } from 'react'

import { Header, Icon, PageWrapper, SwapLabel } from './styled'

const TAB_IDS = {
  XFI: TokenSymbol.xfi,
  lpXFI: TokenSymbol.lpXFI,
}

const TABS = [
  {
    id: TAB_IDS.XFI,
    title: 'XFI',
  },
  {
    id: TAB_IDS.lpXFI,
    title: 'lpXFI',
  },
]

export default function Get() {
  const [tab, setTab] = useState<string>(TABS[0].id)

  const [amount, setAmount] = useState<BigNumber | undefined>(undefined)
  const [amountSecond, setAmountSecond] = useState<BigNumber | undefined>(undefined)
  const [rightToken, setRightToken] = useState(TOKENS[0])

  const { chainId: fromChain = SupportedChainId.BNB } = useActiveWeb3React()

  const [toChain, setToChain] = useState<number>(SupportedChainId.ARBITRUM_ONE)

  return (
    <PageWrapper>
      <CardCenteredGap gap="16px">
        <Header>
          <Row>
            <Icon src={getIcon}></Icon>
            <SwapLabel>Get</SwapLabel>
          </Row>

          <ExplanationBtn title="Buy XFI from any EVM compatible chains (LayerZero) and transfer to CrossFi Chain" />
        </Header>

        <AppToggler tab={tab} setTab={setTab} tabs={TABS} />

        <AppGetSwitcher
          fromChainId={fromChain}
          toChainId={toChain}
          setToChainId={setToChain}
          onUserInput={setAmount}
          color="green"
        />

        <AutoColumn>
          <GreyCard gap="16px">
            <AmountInputWithMax
              inputValue={amount}
              setInputValue={(v) => v && setAmount(v)}
              decimals={18}
              maxValue={BigNumber.from(100)}
              rightTokenOptions={TOKENS}
              rightToken={rightToken}
              onChangeRightToken={(value) => {
                setRightToken({ symbol: value })
              }}
            />

            <AmountInputWithMax
              inputValue={amountSecond}
              setInputValue={(v) => v && setAmountSecond(v)}
              decimals={18}
              maxValue={BigNumber.from(100)}
            />
          </GreyCard>
        </AutoColumn>

        <WarningBlock
          text="Price impact is too high. You will lose a big portion of your funds in this trade"
          borderColor="orange60"
          iconColor="orange"
        />

        <ButtonPrimary disabled={!amount?.isZero()}>Enter an amount</ButtonPrimary>

        {tab === TAB_IDS.lpXFI && <GetOverview />}
      </CardCenteredGap>
    </PageWrapper>
  )
}

const TOKENS = [
  TokenSymbol.weth,
  TokenSymbol.xfi,
  TokenSymbol.lpXFI,
  TokenSymbol.usdt,
  TokenSymbol.esXFI,
  TokenSymbol.eth,
  TokenSymbol.xUsd,
].map((token) => ({
  symbol: token,
}))
