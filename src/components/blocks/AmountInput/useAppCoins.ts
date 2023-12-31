import { LP_ADDRESS, WETH_XFI } from 'constants/app-contracts'
import { SupportedChainId } from 'constants/chainsinfo'
import { useMemo } from 'react'

import esXFI from './icons/esXFI.svg'
import ETHIcon from './icons/eth.svg'
import lpXFI from './icons/lpXFI.svg'
import xfiIcon from './icons/xfi.svg'
import { IPickerToken } from './useAmountInput'

export interface IAppToken {
  symbol: string
  icon: string
  label: string
  token_addrs?: {
    [chainId: number]: string
  }
}
export enum TokenSymbol {
  lpXFI = 'lpXFI',
  esXFI = 'esXFI',
  xfi = 'xfi',
  eth = 'eth',
  weth = 'weth',
}

const TOKENS: IAppToken[] = [
  {
    symbol: TokenSymbol.lpXFI,
    icon: lpXFI,
    label: 'lpXFI',
    token_addrs: {
      [SupportedChainId.XFI_TESTNET]: LP_ADDRESS,
    },
  },
  {
    symbol: TokenSymbol.esXFI,
    icon: esXFI,
    label: 'esXFI',
    // TODO add address
    // token_addrs: {
    // },
  },
  {
    symbol: TokenSymbol.xfi,
    icon: xfiIcon,
    label: 'XFI',
    // TODO add address
    // token_addrs: {
    // },
  },
  {
    symbol: TokenSymbol.eth,
    icon: ETHIcon,
    label: 'ETH',
    token_addrs: {
      [SupportedChainId.XFI_TESTNET]: 'ETH',
    },
  },
  {
    symbol: TokenSymbol.weth,
    icon: ETHIcon,
    label: 'WETH',
    token_addrs: {
      [SupportedChainId.XFI_TESTNET]: WETH_XFI,
    },
  },
]

const DEFAULT_ETH: IAppToken = {
  symbol: TokenSymbol.eth,
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
