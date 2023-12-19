import warningIcon from 'assets/icons/warning.svg'
import { Row } from 'components/Row'
import styled from 'styled-components'
import { TYPE } from 'theme/theme'

const Icon = styled.img`
  width: 24px;
  height: 24px;
`

const RowStyled = styled(Row)`
  padding: 12px;
  gap: 12px;
  display: flex;
  border-radius: 15px;
  border: 1px solid ${({ theme }) => theme.darkOrange60};
  align-items: flex-start;
`

export const WarningBlock = ({ text }: { text: string }) => {
  return (
    <RowStyled>
      <Icon src={warningIcon}></Icon>
      <TYPE.body color="dark80">{text}</TYPE.body>
    </RowStyled>
  )
}
