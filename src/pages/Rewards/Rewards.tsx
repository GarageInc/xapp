import rewardsIcon from 'assets/images/menu/rewards.svg'
import { AmountInputWithMax } from 'components/blocks/AmountInput/AmountInput'
import { ButtonPrimary } from 'components/Button'
import { CardCenteredGap, GreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import { ExplanationBtn } from 'components/ExplanationBtn/ExplanationBtn'
import { Row } from 'components/Row'
import { BigNumber } from 'ethers'
import { useCallback, useState } from 'react'
import { TYPE } from 'theme/theme'

import { Header, Icon, PageWrapper, SwapLabel } from './styled'

export default function Rewards() {
  const [amountFirst, setAmountFirst] = useState<number | undefined>(undefined)

  const onMaxHandlerFirst = useCallback(() => {
    setAmountFirst(100)
  }, [])

  return (
    <PageWrapper>
      <CardCenteredGap gap="16px">
        <Header>
          <Row>
            <Icon src={rewardsIcon}></Icon>
            <SwapLabel>Rewards</SwapLabel>
          </Row>

          <ExplanationBtn title="Claim WETH Rewards from LayerZero Comissions" />
        </Header>

        <AutoColumn>
          <GreyCard gap="16px">
            <TYPE.body fontWeight={400} color="dark40">
              Claim
            </TYPE.body>

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
