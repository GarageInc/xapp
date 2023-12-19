import { GreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import { RowBetween } from 'components/Row'
import styled from 'styled-components'

const Label = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.dark40};
`

const Value = styled.div`
  font-weight: 500;
  font-size: 14px;
`

const ColumnStyled = styled(AutoColumn)`
  padding: 6px 0;
`

export const ApyBlock = () => {
  return (
    <GreyCard>
      <ColumnStyled gap="6px">
        <RowBetween>
          <Label>wETH APR</Label>

          <Value>123%</Value>
        </RowBetween>

        <RowBetween>
          <Label>esXFI APR</Label>

          <Value>123%</Value>
        </RowBetween>

        <RowBetween>
          <Label>Boost percentage</Label>

          <Value>123%</Value>
        </RowBetween>
      </ColumnStyled>
    </GreyCard>
  )
}
