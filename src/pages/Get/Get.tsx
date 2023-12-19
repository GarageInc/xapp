import getIcon from 'assets/images/menu/get.svg'
import { AppGetSwitcher } from 'components/AppGetSwitcher/AppGetSwitcher'
import { AppToggler } from 'components/AppToggler/AppToggler'
import { AmountInputWithMax } from 'components/blocks/AmountInput'
import { ButtonPrimary } from 'components/Button'
import { CardCenteredGap, GreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import { ExplanationBtn } from 'components/ExplanationBtn/ExplanationBtn'
import { GetOverview } from 'components/GetOverview/GetOverview'
import { Row } from 'components/Row'
import { BigNumber } from 'ethers'
import { useCallback, useState } from 'react'
import { TYPE } from 'theme/theme'

import { Header, Icon, PageWrapper, SwapLabel } from './styled'

const TAB_IDS = {
  XFI: 'xfi',
  lpXFI: 'lpXFI',
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

  const [amountFirst, setAmountFirst] = useState<number | undefined>(undefined)
  const [amountSecond, setAmountSecond] = useState<number | undefined>(undefined)

  const onMaxHandlerFirst = useCallback(() => {
    setAmountFirst(100)
  }, [])

  const onMaxHandlerSecond = useCallback(() => {
    setAmountSecond(100)
  }, [])

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

        <AppGetSwitcher />

        <AutoColumn>
          <GreyCard gap="16px">
            <AmountInputWithMax
              value={amountFirst}
              onUserInput={(v) => v && setAmountFirst(+v)}
              onMaxClicked={onMaxHandlerFirst}
              decimals={18}
              maxValue={BigNumber.from(100)}
            />

            <AmountInputWithMax
              value={amountSecond}
              onUserInput={(v) => v && setAmountSecond(+v)}
              onMaxClicked={onMaxHandlerSecond}
              decimals={18}
              maxValue={BigNumber.from(100)}
            />
          </GreyCard>
        </AutoColumn>

        <ButtonPrimary disabled={!amountFirst}>Enter an amount</ButtonPrimary>

        {tab === TAB_IDS.lpXFI && <GetOverview />}
      </CardCenteredGap>
    </PageWrapper>
  )
}
