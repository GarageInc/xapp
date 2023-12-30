import { useActiveWeb3React } from 'hooks/web3'
import { useMemo } from 'react'

import erc20Abi from '../abis/erc20.json'
import { Erc20, LayerZeroResolver, Staking, WrappedOmnichainXfi } from '../abis/types'
import stakingAbi from '../abis/xapp/Staking.json'
import layerZeroErc20Abi from '../abis/xapp/wrapped-omnichain-xfi.json'
import { useContract } from '../hooks/useContract'
import layerZeroResolverAbi from './../abis/layer-zero-resolver.json'
import { SupportedChainId } from './chainsinfo'

const STAKING_ADDRESS = '0x1E1B4c52A752d80df92B0c96e8B706C065980eC9'

export const LP_ADDRESS = '0xB867C7a3e18deb63964AF56bF0770c20Fe4d80df'

export const WETH_XFI = '0x74f4B6c7F7F518202231b58CE6e8736DF6B50A81'

const WRAPPED_oXFI_BSC = '0x7e1B68D16C4ACfDcdE38f6eAAbebB34eb3D5E2CB'
const oXFI_BSC = '0x922b644d46AbBc5Faec10d832E2b5826A15baA1c'

export const useErc20Contract = (token?: string) => {
  return useContract<Erc20>(token, erc20Abi)
}

export const useStakingLPContract = () => {
  return useErc20Contract(LP_ADDRESS)
}

export const useStakingContract = () => {
  return useContract<Staking>(STAKING_ADDRESS, stakingAbi)
}

const getSourceByNetwork = (
  chainId: number | undefined,
  xfiMainnet = '',
  xfiTestnet = '',
  bsc = '',
  arbitrum = '',
  avalanche = '',
  polygon = '',
  optimism = ''
): string => {
  if (chainId === SupportedChainId.XFI_TESTNET) {
    return xfiTestnet || ''
  } else if (chainId === SupportedChainId.BNB) {
    return bsc
  } else if (chainId === SupportedChainId.ARBITRUM_ONE) {
    return arbitrum
  } else if (chainId === SupportedChainId.AVALANCHE) {
    return avalanche
  }
  if (chainId === SupportedChainId.POLYGON) {
    return polygon
  }
  if (chainId === SupportedChainId.OPTIMISM) {
    return optimism
  }

  return ''
}

const LAYER_ZERO_ENDPOINTS = {
  hardhat: '0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675',
  ethereum: '0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675',
  bsc: '0x3c2269811836af69497E5F486A85D7316753cf62',
  avalanche: '0x3c2269811836af69497E5F486A85D7316753cf62',
  polygon: '0x3c2269811836af69497E5F486A85D7316753cf62',
  arbitrum: '0x3c2269811836af69497E5F486A85D7316753cf62',
  optimism: '0x3c2269811836af69497E5F486A85D7316753cf62',
  fantom: '0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7',
  goerli: '0xbfD2135BFfbb0B5378b56643c2Df8a87552Bfa23',
  'bsc-testnet': '0x6Fcb97553D41516Cb228ac03FdC8B9a0a9df04A1',
  fuji: '0x93f54D755A063cE7bB9e6Ac47Eccc8e33411d706',
  mumbai: '0xf69186dfBa60DdB133E91E9A4B5673624293d8F8',
  'arbitrum-goerli': '0x6aB5Ae6822647046626e83ee6dB8187151E1d5ab',
  'optimism-goerli': '0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1',
  'fantom-testnet': '0x7dcAD72640F835B0FA36EFD3D6d3ec902C7E5acf',
  moonbase: '0x6Fcb97553D41516Cb228ac03FdC8B9a0a9df04A1',
  moonbeam: '0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4',
}

const useLayerZeroResolverAddress = () => {
  const { chainId } = useActiveWeb3React()
  return useMemo(() => {
    return getSourceByNetwork(chainId, '', '', LAYER_ZERO_ENDPOINTS.bsc, LAYER_ZERO_ENDPOINTS.arbitrum)
  }, [chainId])
}

export const useLayerZeroResolverContract = () => {
  const address = useLayerZeroResolverAddress()
  return useContract<LayerZeroResolver>(address, layerZeroResolverAbi)
}

export const useLayerZeroErc20Contract = () => {
  const address = useLayerZeroErc20Address()

  return useContract<WrappedOmnichainXfi>(address, layerZeroErc20Abi)
}

const useLayerZeroErc20Address = () => {
  const { chainId } = useActiveWeb3React()
  return useMemo(() => {
    return getSourceByNetwork(chainId, '', '', WRAPPED_oXFI_BSC, oXFI_BSC, oXFI_BSC, oXFI_BSC, oXFI_BSC)
  }, [chainId])
}
