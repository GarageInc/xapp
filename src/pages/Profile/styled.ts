import { Row, RowBetween } from 'components/Row'
import styled from 'styled-components'

export const PageWrapper = styled.div`
  flex: 1;
  justify-content: center;
  margin: auto;
  width: 100%;
  max-width: 600px;
  flex-direction: column;
  display: flex;

  ${({ theme }) => theme.mediaWidth.upToPhone`
    justify-content: flex-start;
  `};
`
export const PageContent = styled.div`
  height: 100%;
  margin-bottom: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    margin: 50px 0 140px;
  `};

  ${({ theme }) => theme.mediaWidth.upToPhone`
    margin: 50px 0 120px;
    justify-content: flex-start;
  `};
`

export const Balance = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const Amount = styled(Row)`
  align-items: baseline;
  justify-content: center;
`

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.white};

  ${({ theme }) => theme.mediaWidth.upToPhone`
    height:100%;
    padding: 24px 12px 0;
    border-radius: 24px 24px 0 0;
  `};
`

export const Header = styled(RowBetween)`
  align-items: center;
`
