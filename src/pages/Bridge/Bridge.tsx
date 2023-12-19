import bridgeIcon from 'assets/images/menu/bridge.svg'
import { AppGetSwitcher } from 'components/AppGetSwitcher/AppGetSwitcher'
import { AmountInputWithMax } from 'components/blocks/AmountInput'
import { ButtonPrimary } from 'components/Button'
import { CardCenteredGap, GreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import { ExplanationBtn } from 'components/ExplanationBtn/ExplanationBtn'
import { Row } from 'components/Row'
import { BigNumber } from 'ethers'
import { useCallback, useState } from 'react'

import { Header, Icon, PageWrapper, SwapLabel } from './styled'

export default function Bridge() {
  const [amountFirst, setAmountFirst] = useState<number | undefined>(undefined)

  const onMaxHandlerFirst = useCallback(() => {
    setAmountFirst(100)
  }, [])

  return (
    <PageWrapper>
      <CardCenteredGap gap="16px">
        <Header>
          <Row>
            <Icon src={bridgeIcon}></Icon>
            <SwapLabel>Bridge</SwapLabel>
          </Row>

          <ExplanationBtn title="Bridge your tokens between different chains" />
        </Header>

        <AppGetSwitcher mainColor="appViolet" subColor="appViolet35" bgColor="appViolet15" />

        <AutoColumn>
          <GreyCard gap="16px">
            <AmountInputWithMax
              value={amountFirst}
              onUserInput={(v) => v && setAmountFirst(+v)}
              onMaxClicked={onMaxHandlerFirst}
              decimals={18}
              maxValue={BigNumber.from(100)}
            />
          </GreyCard>
        </AutoColumn>

        <ButtonPrimary disabled={!amountFirst}>Enter an amount</ButtonPrimary>
      </CardCenteredGap>
    </PageWrapper>
  )
}
