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
import { SupportedChainId } from 'constants/chainsinfo'
import { BigNumber } from 'ethers'
import { useActiveWeb3React } from 'hooks/web3'
import { useState } from 'react'
import { TYPE } from 'theme/theme'

import { Header, Icon, PageWrapper, SwapLabel } from './styled'

const TAB_IDS = {
  XFI: TokenSymbol.xfi,
  lpXFI: TokenSymbol.lpXFI,
}

const TABS = [
  {
    id: TAB_IDS.XFI,
    title: (
      <TYPE.body fontWeight={400} color="main">
        XFI
      </TYPE.body>
    ),
  },
  {
    id: TAB_IDS.lpXFI,
    title: (
      <TYPE.body fontWeight={400} color="appViolet">
        lpXFI
      </TYPE.body>
    ),
  },
]

export default function Get() {
  const [tab, setTab] = useState<string>(TABS[0].id)

  const [amount, setAmount] = useState<BigNumber | undefined>(undefined)
  const [amountSecond, setAmountSecond] = useState<BigNumber | undefined>(undefined)

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

        <AppGetSwitcher fromChainId={fromChain} toChainId={toChain} setToChainId={setToChain} onUserInput={setAmount} />

        <AutoColumn>
          <GreyCard gap="16px">
            <AmountInputWithMax
              inputValue={amount}
              setInputValue={(v) => v && setAmount(v)}
              decimals={18}
              maxValue={BigNumber.from(100)}
            />

            <AmountInputWithMax
              inputValue={amountSecond}
              setInputValue={(v) => v && setAmountSecond(v)}
              decimals={18}
              maxValue={BigNumber.from(100)}
            />
          </GreyCard>
        </AutoColumn>

        <ButtonPrimary disabled={!amount?.isZero()}>Enter an amount</ButtonPrimary>

        {tab === TAB_IDS.lpXFI && <GetOverview />}
      </CardCenteredGap>
    </PageWrapper>
  )
}
