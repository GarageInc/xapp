import replaceSvg from 'assets/icons/replace.svg'
import settingsIcon from 'assets/icons/settings.svg'
import swapIcon from 'assets/images/menu/swap.svg'
import { AmountInputWithMax } from 'components/blocks/AmountInput/AmountInput'
import { ButtonPrimary } from 'components/Button'
import { CardCentered, GreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import { Row, RowBetween } from 'components/Row'
import { BigNumber } from 'ethers'
import { useCallback, useState } from 'react'
import styled from 'styled-components'

const PageWrapper = styled.div`
  flex: 1;
  justify-content: center;
  margin: auto;
  width: 100%;

  display: flex;
`

const Header = styled(RowBetween)`
  align-items: center;
  margin-bottom: 16px;
`

const SettingsBtn = styled.div`
  border-radius: 50%;
`

const SwapLabel = styled.div`
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
`

const SettingsIcon = styled.img`
  width: 40px;
  height: 40px;

  cursor: pointer;
`

const Icon = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 12px;
`

const Footer = styled.div`
  margin-top: 16px;
`

const SwapBlock = styled.div`
  position: relative;
  margin: 8px 0;
  cursor: pointer;
`

const AbsoluteSwapIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  cursor: pointer;
  padding: 12px;
  border-radius: 50%;
  background: ${({ theme }) => theme.light};
`

export default function Swap() {
  const [amountFirst, setAmountFirst] = useState<number | undefined>()

  const onMaxHandlerFirst = useCallback(() => {
    setAmountFirst(100)
  }, [])

  const [amountSecond, setAmountSecond] = useState<number | undefined>()

  const onMaxHandlerSecond = useCallback(() => {
    setAmountSecond(100)
  }, [])

  return (
    <PageWrapper>
      <CardCentered maxWidth="600px">
        <Header>
          <Row>
            <Icon src={swapIcon}></Icon>
            <SwapLabel>Swap</SwapLabel>
          </Row>

          <SettingsBtn>
            <SettingsIcon src={settingsIcon}></SettingsIcon>
          </SettingsBtn>
        </Header>

        <AutoColumn>
          <GreyCard>
            <RowBetween>
              <AmountInputWithMax
                value={amountFirst}
                onUserInput={(v) => v && setAmountFirst(+v)}
                onMaxClicked={onMaxHandlerFirst}
                decimals={18}
                maxValue={BigNumber.from(100)}
              />
            </RowBetween>
          </GreyCard>

          <SwapBlock>
            <AbsoluteSwapIcon src={replaceSvg} />
          </SwapBlock>

          <GreyCard>
            <RowBetween>
              <AmountInputWithMax
                value={amountFirst}
                onUserInput={(v) => v && setAmountSecond(+v)}
                onMaxClicked={onMaxHandlerSecond}
                decimals={18}
                maxValue={BigNumber.from(100)}
              />
            </RowBetween>
          </GreyCard>
        </AutoColumn>

        <Footer>
          <ButtonPrimary disabled={amountFirst === 0}>Enter an amount</ButtonPrimary>
        </Footer>
      </CardCentered>
    </PageWrapper>
  )
}
