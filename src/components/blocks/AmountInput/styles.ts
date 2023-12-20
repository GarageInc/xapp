import { TextField, Typography } from '@mui/material'
import Dropdown from 'components/Dropdown'
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
      color: ${({ theme }) => theme.dark30};

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
    }

    &.Mui-focused {
      .MuiOutlinedInput-notchedOutline {
        border-width: 1px;
        border-color: rgba(255, 255, 255, 0.3);
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

export const BalanceText = styled(Typography)`
  font-size: 13px;
`

export const CoinLabel = styled(Typography)<{ coinSymbol: string }>`
  color: ${({ theme, coinSymbol }) => {
    if (coinSymbol === 'lpXFI') {
      return theme.appViolet
    }

    return theme.text1
  }};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`

export const Picker = styled(Dropdown)<{ bgColor?: string }>`
  .Dropdown-placeholder {
    ${BalanceText} {
      display: none;
    }

    ${({ theme }) => theme.mediaWidth.upToSmall`
      margin: 0;
    `};
  }

  .Dropdown-control {
    background-color: ${({ theme, bgColor = 'violet25' }) => {
      return bgColor ? (theme as any)[bgColor] : theme.light
    }};

    ${({ theme }) => theme.mediaWidth.upToSmall`
      min-width: 140px;
      padding-left: 8px;
    `};
  }

  .Dropdown-arrow {
    ${({ theme }) => theme.mediaWidth.upToSmall`
      display: none;
    `};
  }

  .Dropdown-menu {
    ${({ theme }) => theme.mediaWidth.upToSmall`
      min-width: 220px;
    `};
  }

  .Dropdown-control {
    .is-selected {
      p {
        font-size: 32px;
      }
    }
  }
`

export const InputContainer = styled(Box)`
  flex-direction: column;
  width: 100%;
`

export const RightTokenBoxIcon = styled.img`
  height: 30px;
`

export const RightTokenBox = styled(Box)`
  flex-direction: row;
  align-items: center;
  margin-left: 12px;
  border-radius: 20px;
  gap: 8px;
  padding: 6px;
  background-color: ${({ theme }) => theme.light};

  p {
    color: ${({ theme }) => theme.main};
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
  }
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

export const PickerLabel = styled(Box)`
  flex-direction: row;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 12px;  
  `};
`
