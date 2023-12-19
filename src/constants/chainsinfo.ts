import crossFiLogoUrl from 'assets/images/crossfi.png'
import ethereumLogoUrl from 'assets/images/ethereum-logo.png'
import arbitrumLogoUrl from 'assets/svg/arbitrum_logo.svg'
import ms from 'ms.macro'

import { SupportedL1ChainId, SupportedL2ChainId } from './chains'
import { ARBITRUM_LIST } from './lists'
/**
 * List of all the networks supported by the Uniswap Interface
 */
export enum SupportedChainId {
  MAINNET = 1,
  ARBITRUM_ONE = 42161,

  XFI = 4157,
}

enum NetworkType {
  L1,
  L2,
}

interface BaseChainInfo {
  readonly networkType: NetworkType
  readonly blockWaitMsBeforeWarning?: number
  readonly docs: string
  readonly bridge?: string
  readonly explorer: string
  readonly logoUrl: string
  readonly label: string
  readonly helpCenterUrl?: string
  readonly nativeCurrency: {
    name: string // e.g. 'Goerli ETH',
    symbol: string // e.g. 'gorETH',
    decimals: number // e.g. 18,
  }
}

interface L1ChainInfo extends BaseChainInfo {
  readonly networkType: NetworkType.L1
}

interface L2ChainInfo extends BaseChainInfo {
  readonly networkType: NetworkType.L2
  readonly bridge: string
  readonly statusPage?: string
  readonly defaultListUrl: string
}

type ChainInfoMap = { readonly [chainId: number]: L1ChainInfo | L2ChainInfo } & {
  readonly [chainId in SupportedL2ChainId]: L2ChainInfo
} & { readonly [chainId in SupportedL1ChainId]: L1ChainInfo }

// @ts-ignore
export const CHAIN_INFO: ChainInfoMap = {
  [SupportedChainId.MAINNET]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.xapp.com/',
    explorer: 'https://etherscan.io/',
    label: 'Ethereum',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  [SupportedChainId.XFI]: {
    networkType: NetworkType.L1,
    docs: 'https://scan.testnet.ms/',
    explorer: 'https://scan.testnet.ms/',
    label: 'CrossFi',
    logoUrl: crossFiLogoUrl,
    nativeCurrency: { name: 'XFI', symbol: 'XFI', decimals: 18 },
  },
  [SupportedChainId.ARBITRUM_ONE]: {
    networkType: NetworkType.L2,
    blockWaitMsBeforeWarning: ms`10m`,
    bridge: '#/battles/bridge',
    docs: 'https://offchainlabs.com/',
    explorer: 'https://arbiscan.io/',
    label: 'Arbitrum',
    logoUrl: arbitrumLogoUrl,
    defaultListUrl: ARBITRUM_LIST,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
}
