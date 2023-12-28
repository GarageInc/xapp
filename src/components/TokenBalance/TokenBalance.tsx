import { Typography, TypographyProps } from '@mui/material'
import { TokenSymbol } from 'components/blocks/AmountInput/useAppCoins'
import { SupportedChainId } from 'constants/chainsinfo'
import { useTokenBalance, useTokenDecimals } from 'hooks/base/token'
import { useActiveWeb3React } from 'hooks/web3'
import { FC, useMemo } from 'react'
import { useNativeCurrencyBalance } from 'state/wallet/hooks'
import { formatDecimal } from 'utils/numberWithCommas'

type Props = { coin: any; typographyProps?: TypographyProps }

const TokenBalance: FC<Props> = ({ coin, typographyProps }) => {
  const isNative = coin.symbol === TokenSymbol.xfi
  const { chainId = SupportedChainId.XFI_TESTNET } = useActiveWeb3React()

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

  return (
    <Typography fontSize={13} {...typographyProps}>
      {coinBalance}
    </Typography>
  )
}

export default TokenBalance
