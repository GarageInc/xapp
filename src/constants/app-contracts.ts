import erc20Abi from '../abis/erc20.json'
import { Erc20, Staking } from '../abis/types'
import stakingAbi from '../abis/xapp/Staking.json'
import { useContract } from '../hooks/useContract'

const STAKING_ADDRESS = '0x1E1B4c52A752d80df92B0c96e8B706C065980eC9'

export const LP_ADDRESS = '0xB867C7a3e18deb63964AF56bF0770c20Fe4d80df'

export const WETH_XFI = '0x74f4B6c7F7F518202231b58CE6e8736DF6B50A81'

export const useErc20Contract = (token?: string) => {
  return useContract<Erc20>(token, erc20Abi)
}

export const useStakingLPContract = () => {
  return useErc20Contract(LP_ADDRESS)
}

const useStakingRewardTokenContract = () => {
  return useErc20Contract(WETH_XFI)
}

export const useStakingContract = () => {
  return useContract<Staking>(STAKING_ADDRESS, stakingAbi)
}
