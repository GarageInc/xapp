import { Box } from 'components/MUI'
import TokenBalance from 'components/TokenBalance/TokenBalance'
import { useCallback, useMemo } from 'react'

import { CoinLabel, Picker, PickerLabel, RightTokenBox, RightTokenBoxIcon } from './styles'
import { IPickerToken } from './useAmountInput'
import { IAppToken, useAllCoins } from './useAppCoins'

interface IRightTokenSelector {
  value: IAppToken
  options?: IPickerToken[]
  onChangeRightToken?: (symbol: string) => void
  bgColor?: string
}

const usePickerOptions = (options?: IPickerToken[]) => {
  const coins = useAllCoins(options || [])

  return useMemo(
    () =>
      coins.map((coin) => {
        if (!coin) {
          return { label: '', value: '' }
        }
        return {
          value: coin.symbol,
          label: (
            <PickerLabel>
              <img src={coin.icon} />
              &nbsp;&nbsp;&nbsp;
              <CoinLabel coinSymbol={coin.symbol}>{coin.label}</CoinLabel>
              <Box flex={1} />
              <TokenBalance coin={coin} typographyProps={{ className: 'tokenBalance' }} />
            </PickerLabel>
          ),
        }
      }),
    [coins]
  )
}

export const RightTokenSelector = ({ value, options, onChangeRightToken, bgColor }: IRightTokenSelector) => {
  const pickerOptions = usePickerOptions(options)
  const selectedToken = value

  const onChangeHandler = useCallback(
    ({ value }: any) => {
      onChangeRightToken?.(value)
    },
    [onChangeRightToken]
  )

  if (options && options.length > 1) {
    return <Picker options={pickerOptions} value={value.symbol} onChange={onChangeHandler} bgColor={bgColor} />
  } else {
    return (
      <RightTokenBox bgColor={bgColor}>
        <RightTokenBoxIcon src={selectedToken?.icon} />
        <CoinLabel coinSymbol={selectedToken.symbol}>{selectedToken?.label}</CoinLabel>
      </RightTokenBox>
    )
  }
}
