import { useErc20Contract } from 'constants/app-contracts'
import { Contract } from 'ethers'
import { useMemo } from 'react'
import { useSingleCallResult } from 'state/multicall/hooks'

import { useErc721Contract } from './useContract'

export const useContractName = (token: string) => {
  const tokenContract = useErc721Contract(token)
  const result = useSingleCallResult(tokenContract, 'name')

  return {
    name: result?.result?.[0],
    loading: result.loading,
  }
}

export const useContractERC20Symbol = (tokenContract: Contract | null) => {
  const result = useSingleCallResult(tokenContract, 'symbol')

  return useMemo(() => {
    return {
      symbol: replaceSymbol(result?.result?.[0]),
      loading: result.loading,
    }
  }, [result])
}

export const useERC20Symbol = (token?: string) => {
  const tokenContract = useErc20Contract(token)
  const result = useSingleCallResult(tokenContract, 'symbol')

  return useMemo(() => {
    return {
      symbol: replaceSymbol(result?.result?.[0]),
      loading: result.loading,
    }
  }, [result])
}

const replaceSymbol = (symbol: string) => {
  if (symbol === 'CMLT-LP') {
    return 'ZOO LP'
  }
  return symbol
}
