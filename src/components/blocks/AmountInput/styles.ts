import { TextField } from '@mui/material'
import { Box } from 'components/MUI'
import { Row } from 'components/Row'
import styled from 'styled-components'

export const AmountValueInput = styled(TextField)`
  .MuiOutlinedInput-root {
    &.MuiInputBase-adornedStart {
      padding-left: 16px;
    }

    &.MuiInputBase-adornedEnd {
      padding-right: 0;
    }

    .MuiInputAdornment-positionStart {
      margin-right: 12px;
    }

    .MuiInputAdornment-positionEnd {
    }

    .MuiInputAdornment-root {
      max-height: unset;
      height: unset;
    }

    .MuiInputBase-input {
      padding: 0px 0;
      font-size: 32px;
      font-style: normal;
      font-weight: 400;
      color: ${({ theme }) => theme.text1};

      ::-webkit-search-decoration {
        -webkit-appearance: none;
      }

      [type='number'] {
        -moz-appearance: textfield;
      }

      ::-webkit-outer-spin-button,
      ::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }

      ::placeholder {
        color: ${({ theme }) => theme.dark30};
      }

      &.Mui-disabled {
        color: ${({ theme }) => theme.text1};
        -webkit-text-fill-color: ${({ theme }) => theme.text1};
      }
    }

    &.Mui-focused {
      .MuiOutlinedInput-notchedOutline {
      }
    }

    .MuiOutlinedInput-notchedOutline {
      border-width: 0;
    }
  }
`

export const MaxButton = styled.div`
  color: ${({ theme }) => theme.dark40};
  font-size: 16px;

  &:hover {
    border-color: ${({ theme }) => theme.text1};
  }
`

export const InputContainer = styled(Box)`
  flex-direction: column;
  width: 100%;
`

export const BalanceValue = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: ${({ theme }) => theme.dark70};
`

export const AmountBalanceRow = styled(Row)`
  gap: 8px;
`

export const WalletIcon = styled.img``
