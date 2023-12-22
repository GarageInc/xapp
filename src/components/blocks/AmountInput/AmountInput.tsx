import { InputAdornment, InputProps } from '@mui/material'
import walletSvg from 'assets/icons/wallet.svg'
import {
  AmountBalanceRow,
  AmountValueInput,
  BalanceValue,
  InputContainer,
  MaxButton,
  WalletIcon,
} from 'components/blocks/AmountInput/styles'
import { IAmountInput, IAmountWithMax, useAmountInput } from 'components/blocks/AmountInput/useAmountInput'
import { Box } from 'components/MUI'
import { BigNumber } from 'ethers'
import { useCallback, useMemo } from 'react'
import { fromWei } from 'utils/fromWei'
import { getBigNumberValue } from 'utils/getBigNumberValue'
import { ZERO } from 'utils/isZero'

import { RightTokenSelector } from './RightTokenSelector'

/**
 * Amount Input
 * @constructor
 */
const AmountInput = (props: IAmountInput) => {
  const { onMaxClicked, max, placeholder, rightTokenOptions, onChangeRightToken, maxDisabled, ...rest } = props
  const { value, onChange, rightToken } = useAmountInput(props)

  const { bgColor, walletIcon, showBalanceRow = true } = props

  const inputProps = useMemo(() => {
    const result: InputProps = {}

    if (rightToken) {
      result.endAdornment = (
        <InputAdornment position="end">
          {rightToken ? (
            <RightTokenSelector
              value={rightToken}
              options={rightTokenOptions}
              onChangeRightToken={onChangeRightToken}
              bgColor={bgColor}
            />
          ) : (
            <Box width={4} />
          )}
        </InputAdornment>
      )
    }
    return result
  }, [rightToken, rightTokenOptions, bgColor, onChangeRightToken])

  return (
    <InputContainer>
      <AmountValueInput
        InputProps={inputProps}
        inputProps={{
          // universal input options
          inputMode: 'decimal',
          autoComplete: 'off',
          autoCorrect: 'off',
          // text-specific options
          type: 'number',
          pattern: '^[0-9]*[.,]?[0-9]*$',
          placeholder: placeholder || '0.0',
          minLength: 1,
          maxLength: 79,
          spellCheck: 'false',
          max,
        }}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {showBalanceRow ? (
        <AmountBalanceRow alignItems="center" width="100%" justify="flex-end" marginTop="16px">
          {onMaxClicked && !maxDisabled && <MaxButton onClick={onMaxClicked}>+max</MaxButton>}

          <WalletIcon src={walletIcon || walletSvg} />

          <BalanceValue>{max}</BalanceValue>
        </AmountBalanceRow>
      ) : null}
    </InputContainer>
  )
}

export const AmountInputWithMax = ({ inputValue, setInputValue, maxValue, decimals = 18, ...rest }: IAmountWithMax) => {
  const asNumber = useMemo(() => +fromWei(maxValue, decimals), [maxValue, decimals])

  const inputAsNumber = useMemo(() => +fromWei(inputValue || ZERO, decimals) || undefined, [inputValue, decimals])

  const onInputHandler = useCallback(
    (val: any) => {
      setInputValue && setInputValue(getBigNumberValue(val ? +val : 0, BigNumber.from(10).pow(decimals)))
    },
    [decimals, setInputValue]
  )

  const onMaxHandler = useCallback(() => {
    setInputValue && setInputValue(maxValue)
  }, [maxValue, setInputValue])

  return (
    <AmountInput
      value={inputAsNumber}
      onUserInput={onInputHandler}
      max={asNumber}
      onMaxClicked={onMaxHandler}
      maxDisabled={asNumber === 0}
      {...rest}
    />
  )
}
