import { RowBetween } from 'components/Row'
import styled from 'styled-components'

export const PageWrapper = styled.div`
  flex: 1;
  justify-content: center;
  margin: auto;
  width: 100%;
  max-width: 600px;
  flex-direction: column;
  display: flex;
`

export const Header = styled(RowBetween)`
  align-items: center;
`

export const SwapLabel = styled.div`
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
`

export const Icon = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 12px;
`
