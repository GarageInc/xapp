import { Typography } from '@mui/material'
import { BalanceText } from 'components/blocks/AmountInput/styles'
import { Box } from 'components/MUI'
import { SupportedChainId } from 'constants/chainsinfo'
import { useTokenBalance, useTokenDecimals } from 'hooks/base/token'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback, useMemo } from 'react'
import { useNativeCurrencyBalance } from 'state/wallet/hooks'
import { formatDecimal } from 'utils/numberWithCommas'

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
              <TokenBalance coin={coin} />
            </PickerLabel>
          ),
        }
      }),
    [coins]
  )
}

const TokenBalance = ({ coin }: { coin: any }) => {
  const isNative = coin.symbol === 'eth'
  const { chainId = SupportedChainId.MAINNET } = useActiveWeb3React()
  const stableCoinAddr = useMemo(() => coin?.token_addrs?.[chainId] || '', [coin, chainId])
  const decimals = useTokenDecimals(isNative ? '' : stableCoinAddr)

  const totalBalance = useTokenBalance(isNative ? '' : stableCoinAddr)
  const ethBalance = useNativeCurrencyBalance()

  const coinBalance = useMemo(() => {
    if (isNative) {
      return formatDecimal(ethBalance, 2, 18)
    } else {
      return formatDecimal(totalBalance, 2, decimals)
    }
  }, [ethBalance, totalBalance, isNative, decimals])

  return <BalanceText>{coinBalance}</BalanceText>
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

  if (options) {
    return <Picker options={pickerOptions} value={value.symbol} onChange={onChangeHandler} bgColor={bgColor} />
  } else {
    return (
      <RightTokenBox>
        <RightTokenBoxIcon src={selectedToken?.icon} />
        <Typography>{selectedToken?.label}</Typography>
      </RightTokenBox>
    )
  }
}
