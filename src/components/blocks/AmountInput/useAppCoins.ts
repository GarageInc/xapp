import { LP_ADDRESS } from 'constants/app-contracts'
import { SupportedChainId } from 'constants/chainsinfo'
import { useMemo } from 'react'

import ETHIcon from './icons/eth.svg'
import lpXFI from './icons/lpXFI.svg'
import { IPickerToken } from './useAmountInput'

export interface IAppToken {
  symbol: string
  icon: string
  label: string
  token_addrs?: {
    [chainId: number]: string
  }
}

const TOKENS: IAppToken[] = [
  {
    symbol: 'lpXFI',
    icon: lpXFI,
    label: 'lpXFI',
    token_addrs: {
      [SupportedChainId.XFI]: LP_ADDRESS,
    },
  },
  {
    symbol: 'eth',
    icon: ETHIcon,
    label: 'ETH',
    token_addrs: {
      [SupportedChainId.XFI]: 'ETH',
    },
  },
]

const DEFAULT_ETH: IAppToken = {
  symbol: 'eth',
  label: 'ETH',
  icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png',
}

export const useAppSelectedCoin = (symbol?: string): IAppToken => {
  return useMemo(() => {
    if (!symbol) {
      return DEFAULT_ETH
    }

    const foundToken = TOKENS.find((coin) => coin.symbol.toLowerCase() === symbol.toLowerCase())
    return foundToken || DEFAULT_ETH
  }, [symbol])
}

export const useAllCoins = (symbols: IPickerToken[]) => {
  return useMemo(() => {
    return symbols.map(({ symbol, ...rest }) => {
      const coin = TOKENS.find((coin) => coin.symbol.toLowerCase() === symbol.toLowerCase())
      return { ...coin, ...rest }
    }) as any[]
  }, [symbols])
}
