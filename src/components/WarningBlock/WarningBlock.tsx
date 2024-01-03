import WarningIcon from 'components/icons/warning'
import { Row } from 'components/Row'
import { FC } from 'react'
import styled from 'styled-components'
import { ThemeColors } from 'theme/styled'
import { TYPE } from 'theme/theme'

const Icon = styled.img`
  width: 24px;
  height: 24px;
`

const RowStyled = styled(Row)<{ borderColor?: ThemeColors }>`
  padding: 12px;
  gap: 12px;
  display: flex;
  border-radius: 15px;
  border: 1px solid ${({ theme, borderColor = 'darkOrange60' }) => theme[borderColor]};
  align-items: flex-start;
`

type Props = {
  text: string
  borderColor?: ThemeColors
  iconColor?: ThemeColors
}

export const WarningBlock: FC<Props> = ({ text, borderColor = 'darkOrange60', iconColor = 'darkOrange' }) => {
  return (
    <RowStyled borderColor={borderColor}>
      <WarningIcon color={iconColor} />
      <TYPE.body color="dark80">{text}</TYPE.body>
    </RowStyled>
  )
}
