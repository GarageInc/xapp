import { BigNumber } from '@ethersproject/bignumber'
import { hexStripZeros } from '@ethersproject/bytes'
import { ExternalProvider } from '@ethersproject/providers'
import { CHAIN_INFO, SupportedChainId } from 'constants/chainsinfo'
import { RPC_URLS } from 'constants/networks'

import { getExplorerLink } from './getExplorerLink'

interface SwitchNetworkArguments {
  provider: ExternalProvider
  chainId: SupportedChainId
}

function getRpcUrls(chainId: SupportedChainId): [string] {
  if (RPC_URLS[chainId]) {
    return [RPC_URLS[chainId][0]]
  }
  // Our API-keyed URLs will fail security checks when used with external wallets.
  throw new Error('RPC URLs must use public endpoints')
}

// provider.request returns Promise<any>, but wallet_switchEthereumChain must return null or throw
// see https://github.com/rekmarks/EIPs/blob/3326-create/EIPS/eip-3326.md for more info on wallet_switchEthereumChain
export async function switchToNetwork({ provider, chainId }: SwitchNetworkArguments): Promise<null | void> {
  if (!provider.request) {
    return
  }
  const formattedChainId = hexStripZeros(BigNumber.from(chainId).toHexString())

  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: formattedChainId }],
    })
  } catch (error: any) {
    // 4902 is the error code for attempting to switch to an unrecognized chainId
    if (error.code === 4902) {
      const info = CHAIN_INFO[chainId]

      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: formattedChainId,
            chainName: info.label,
            rpcUrls: getRpcUrls(chainId),
            nativeCurrency: info.nativeCurrency,
            blockExplorerUrls: [getExplorerLink(chainId)],
          },
        ],
      })
      // metamask (only known implementer) automatically switches after a network is added
      // the second call is done here because that behavior is not a part of the spec and cannot be relied upon in the future
      // metamask's behavior when switching to the current network is just to return null (a no-op)
      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: formattedChainId }],
        })
      } catch (error) {
        console.debug('Added network but could not switch chains', error)
      }
    } else {
      throw error
    }
  }
}
