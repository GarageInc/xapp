import { useErc20Contract } from 'constants/app-contracts'
import { useActiveWeb3React } from 'hooks/web3'

import { useBalance, useDecimals } from './useBalance'

export const useTokenBalance = (token?: string) => {
  const contract = useErc20Contract(token)

  const { account } = useActiveWeb3React()

  return useBalance(contract, account)
}
export const useTokenDecimals = (token?: string) => {
  const contract = useErc20Contract(token)

  return useDecimals(contract)
}
