import { CurrencyAmount, Token } from '@uniswap/sdk-core'
import { BigNumber } from 'ethers'
import { useMemo } from 'react'

import { useSingleCallResult } from '../state/multicall/hooks'
import { useTokenContract } from './useContract'

export function useTokenAllowance(token?: Token, owner?: string, spender?: string) {
  const contract = useTokenContract(token?.address, false)

  const inputs = useMemo(() => [owner, spender || ''], [owner, spender])
  const allowance = useSingleCallResult(contract, 'allowance', inputs).result

  const currencyAmount = useMemo(
    () => (token && allowance ? CurrencyAmount.fromRawAmount(token, allowance.toString()) : undefined),
    [token, allowance]
  )
  const bnAllowance = useMemo(
    () => (token && allowance ? BigNumber.from(allowance.toString()) : undefined),
    [token, allowance]
  )

  return {
    bnAllowance,
    currencyAmount,
  }
}
