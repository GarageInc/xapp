import { GreyCard } from 'components/Card'
import XfiIcon from 'components/icons/lp-xfi'
import { Accordion } from 'components/MUI'
import { RowBetween } from 'components/Row'
import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { TYPE } from 'theme/theme'
import { ZERO } from 'utils/isZero'
import { formatDecimal } from 'utils/numberWithCommas'

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Container = styled.div``

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const ReceiveLabel = styled.div<{ bg?: string }>`
  border-radius: 16px;
  background: ${({ theme, bg }) => (theme as any)[bg || 'bg1']};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding: 4px 6px;
`

export interface ITxTemplateInfo {
  estimatedGasLimitFunc: (showError?: boolean | undefined) => Promise<BigNumber>
}

interface IProps {
  info: ITxTemplateInfo
}

export const TransactionInfo = ({ info }: IProps) => {
  const { estimatedGasLimitFunc } = info

  const [estimatedGas, setEstimatedGas] = useState<BigNumber>(ZERO)

  useEffect(() => {
    const getEstimatedGas = async () => {
      const gas = await estimatedGasLimitFunc()
      setEstimatedGas(gas)
    }

    getEstimatedGas()
  }, [estimatedGasLimitFunc])

  return (
    <GreyCard>
      <Accordion
        headerSlot={
          <Header>
            <TYPE.mediumHeader fontWeight={500}>Details</TYPE.mediumHeader>
          </Header>
        }
        // TODO get fee
        detailsSlot={
          <Container>
            <RowBetween>
              <Left>
                <TYPE.subHeader>Fee</TYPE.subHeader>
                <ReceiveLabel bg="main15">
                  <XfiIcon color="main" />
                  <TYPE.subHeader color="main">XFI</TYPE.subHeader>
                </ReceiveLabel>
              </Left>

              <TYPE.subHeader fontWeight={500}>{formatDecimal(estimatedGas, 2, 5)} XFI</TYPE.subHeader>
            </RowBetween>
          </Container>
        }
      />
    </GreyCard>
  )
}
