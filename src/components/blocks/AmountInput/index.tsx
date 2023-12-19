import { InputAdornment, InputProps, Typography } from '@mui/material'
import walletSvg from 'assets/icons/wallet.svg'
import {
  AmountBalanceRow,
  AmountValueInput,
  BalanceText,
  BalanceValue,
  InputContainer,
  MaxButton,
  Picker,
  PickerLabel,
  RightTokenBox,
  RightTokenBoxIcon,
  WalletIcon,
} from 'components/blocks/AmountInput/styles'
import {
  IAmountInput,
  IAmountWithMax,
  IPickerToken,
  useAmountInput,
} from 'components/blocks/AmountInput/useAmountInput'
import { Box } from 'components/MUI'
import { SupportedChainId } from 'constants/chainsinfo'
import { BigNumber } from 'ethers'
import { useTokenBalance, useTokenDecimals } from 'hooks/base/token'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback, useMemo } from 'react'
import { useNativeCurrencyBalance } from 'state/wallet/hooks'
import { fromWei } from 'utils/fromWei'
import { getBigNumberValue } from 'utils/getBigNumberValue'
import { ZERO } from 'utils/isZero'
import { formatDecimal } from 'utils/numberWithCommas'

const useStableCoins = (options: IPickerToken[]) => {
  return [] as any[]
}

const usePickerOptions = (options?: IPickerToken[]) => {
  const stableCoins = useStableCoins(options || [])

  return useMemo(
    () =>
      stableCoins.map((coin) => {
        if (!coin) {
          return { label: '', value: '' }
        }
        return {
          value: coin.symbol,
          label: (
            <PickerLabel>
              <img src={coin.icon} />
              &nbsp;&nbsp;&nbsp;
              {coin.label}
              <Box flex={1} />
              <TokenBalance coin={coin} />
            </PickerLabel>
          ),
        }
      }),
    [stableCoins]
  )
}

const TokenBalance = ({ coin }: { coin: any }) => {
  const isNative = coin.symbol === 'eth'
  const { chainId = SupportedChainId.MAINNET } = useActiveWeb3React()
  const stableCoinAddr = useMemo(() => coin?.token_addrs?.[chainId] || '', [coin, chainId])
  const decimals = useTokenDecimals(isNative ? '' : stableCoinAddr)

  const totalBalance = useTokenBalance(isNative ? '' : stableCoinAddr)
  const ethBalance = useNativeCurrencyBalance()

  const stableCoinBalance = useMemo(() => {
    if (isNative) {
      return formatDecimal(ethBalance, 2, 18)
    } else {
      return formatDecimal(totalBalance, 2, decimals)
    }
  }, [ethBalance, totalBalance, isNative, decimals])

  return <BalanceText>{stableCoinBalance}</BalanceText>
}

interface IRightTokenSelector {
  value: IPickerToken
  options?: IPickerToken[]
  onChangeRightToken?: (symbol: string) => void
}

export const useStableCoin = (symbol?: string) => {
  return {
    symbol: 'eth',
    label: 'ETH',
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png',
  }
}

const RightTokenSelector = ({ value, options, onChangeRightToken }: IRightTokenSelector) => {
  const pickerOptions = usePickerOptions(options)
  const selectedToken = useStableCoin(value.symbol)

  if (options) {
    return (
      <Picker
        options={pickerOptions}
        value={value.symbol}
        onChange={({ value }: any) => {
          onChangeRightToken?.(value)
        }}
      />
    )
  } else {
    return (
      <RightTokenBox>
        <RightTokenBoxIcon src={selectedToken?.icon} />
        <Typography>{selectedToken?.label}</Typography>
      </RightTokenBox>
    )
  }
}

/**
 * Amount Input
 * @constructor
 */
const AmountInput = (props: IAmountInput) => {
  const { onMaxClicked, max, placeholder, rightTokenOptions, onChangeRightToken, maxDisabled, ...rest } = props
  const { value, onChange, rightToken } = useAmountInput(props)

  const inputProps = useMemo(() => {
    const result: InputProps = {}

    if (rightToken) {
      result.endAdornment = (
        <InputAdornment position="end">
          {rightToken ? (
            <>
              <RightTokenSelector
                value={rightToken}
                options={rightTokenOptions}
                onChangeRightToken={onChangeRightToken}
              />
            </>
          ) : (
            <Box width={4} />
          )}
        </InputAdornment>
      )
    }
    return result
  }, [rightToken, rightTokenOptions, onChangeRightToken])

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
      <AmountBalanceRow alignItems="center" width="100%" justify="flex-end" marginTop="16px">
        {onMaxClicked && !maxDisabled && <MaxButton onClick={onMaxClicked}>+max</MaxButton>}

        <WalletIcon src={walletSvg} />

        <BalanceValue>{max}</BalanceValue>
      </AmountBalanceRow>
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

  const onMaxHandler = useCallback(() => setInputValue && setInputValue(maxValue), [maxValue, setInputValue])

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
