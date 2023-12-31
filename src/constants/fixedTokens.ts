import ethIcon from 'assets/icons/simpleTokens/eth.svg'
import tetherIcon from 'assets/icons/simpleTokens/tether.svg'
import usdIcon from 'assets/icons/simpleTokens/usd.svg'
import xfiIcon from 'assets/icons/simpleTokens/xfi.svg'
import { LP_ADDRESS } from 'constants/app-contracts'

export type TokenSymbol = 'xfi' | 'tether' | 'usd' | 'eth'

export interface Token {
  symbol: TokenSymbol
  icon: string
  label: string
  currency: string
  token_address?: string
}

export const NATIVE_TOKEN: Token = {
  symbol: 'xfi',
  icon: xfiIcon,
  label: 'XFI',
  currency: 'XFI',
  token_address: LP_ADDRESS,
}

export const FIXED_TOKENS: Token[] = [
  NATIVE_TOKEN,

  {
    symbol: 'tether',
    icon: tetherIcon,
    label: 'Tether USDT',
    currency: 'USDT',
  },
  {
    symbol: 'usd',
    icon: usdIcon,
    label: 'xUSD',
    currency: 'XUSD',
  },
  {
    symbol: 'eth',
    icon: ethIcon,
    label: 'Ethereum',
    currency: 'ETH',
  },
]

export const FIXED_TOKENS_OBJECT = FIXED_TOKENS.reduce<Record<TokenSymbol, Token>>((acc, token) => {
  acc[token.symbol] = token
  return acc
}, {} as Record<TokenSymbol, Token>)
