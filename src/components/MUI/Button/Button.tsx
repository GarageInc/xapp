import { ButtonProps } from '@mui/material'
import MuiButton from '@mui/material/Button'
import styled from 'styled-components'

const MuiButtonStyled = styled(MuiButton)`
  &.Mui-disabled {
    border: none;
    color: ${({ theme }) => theme.text1};
  }
`

const Button: React.FC<ButtonProps> = (props) => {
  return <MuiButtonStyled variant="contained" {...props} />
}

export default Button
