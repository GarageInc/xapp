import { MaxUint256 } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import { TransactionResponse } from '@ethersproject/providers'
import { Currency, CurrencyAmount } from '@uniswap/sdk-core'
import { BigNumber } from 'ethers'
import useBlockNumber from 'hooks/useBlockNumber'
import { useEffect, useState } from 'react'
import { useCallback, useMemo } from 'react'
import { ZERO } from 'utils/isZero'

import { ZERO_ADDRESS } from '../constants/misc'
import { useHasPendingApproval, useHasPendingNftAction, useTransactionAdder } from '../state/transactions/hooks'
import { calculateGasMargin } from '../utils/calculateGasMargin'
import { useTokenContract } from './useContract'
import { useTokenAllowance } from './useTokenAllowance'
import { useActiveWeb3React } from './web3'

export enum ApprovalState {
  UNKNOWN = 'UNKNOWN',
  NOT_APPROVED = 'NOT_APPROVED',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  NOT_OWNER = 'NOT_OWNER',
}

export const useApproveNft = (
  nftStakingPool: string | undefined,
  nftContract: Contract | null,
  tokenId: string | undefined,
  isOwner = false
) => {
  const [approval, setApproved] = useState<ApprovalState>(ApprovalState.UNKNOWN)
  const [ownerIsContract, setOwnerIsContract] = useState<boolean>(false)

  const { chainId } = useActiveWeb3React()
  const blockNumber = useBlockNumber()

  useEffect(() => {
    setOwnerIsContract(false)
    const fetch = async () => {
      if (nftContract) {
        try {
          const address = await nftContract.getApproved(tokenId)

          if (address === ZERO_ADDRESS) {
            setApproved(ApprovalState.NOT_APPROVED)
          } else if (address.toLowerCase() === nftStakingPool?.toLowerCase()) {
            setApproved(ApprovalState.APPROVED)
            setOwnerIsContract(true)
          } else if (address) {
            setApproved(ApprovalState.NOT_APPROVED)
          }
        } catch (e) {
          setApproved(ApprovalState.UNKNOWN)
        }
      }
    }

    if (tokenId !== undefined && tokenId && isOwner && nftContract) {
      fetch()
    } else {
      setApproved(ApprovalState.NOT_OWNER)
    }
  }, [blockNumber, nftContract, tokenId, nftStakingPool, isOwner])

  const addTransaction = useTransactionAdder()

  const actionType = `approving_${tokenId}_${nftContract?.address}`

  const pending = useHasPendingNftAction(actionType, nftContract?.address, tokenId)

  const approve = useCallback(async (): Promise<void> => {
    if (approval !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily')
      return
    }

    if (!chainId) {
      console.error('no chainId')
      return
    }

    if (tokenId === undefined) {
      console.error('no selected token id')
      return
    }

    if (!nftContract) {
      console.error('nftContract is null')
      return
    }

    if (!nftStakingPool) {
      console.error('nftStakingPool is null')
      return
    }

    const estimatedGas = await nftContract.estimateGas.approve(nftStakingPool, tokenId)

    return nftContract
      .approve(nftStakingPool, tokenId, {
        gasLimit: calculateGasMargin(chainId, estimatedGas),
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'Approve NFT',
          approval: { tokenAddress: nftContract.address, spender: nftStakingPool },
          nftAction: {
            nftAddress: nftContract.address,
            tokenId,
            type: actionType,
          },
        })
      })
      .catch((error: Error) => {
        console.debug('Failed to approve token', error)
        throw error
      })
  }, [approval, tokenId, nftContract, actionType, nftStakingPool, addTransaction, chainId])

  const approvalCurrent = useMemo(() => {
    if (pending) {
      return ApprovalState.PENDING
    }

    return approval
  }, [pending, approval])

  return { approval: approvalCurrent, onApprove: approve, ownerIsContract }
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
function useApproveCallback(
  amountToApprove?: CurrencyAmount<Currency>,
  spender?: string
): [ApprovalState, () => Promise<void>] {
  const { account, chainId } = useActiveWeb3React()
  const token = amountToApprove?.currency?.isToken ? amountToApprove.currency : undefined
  const { currencyAmount: currentAllowance } = useTokenAllowance(token, account ?? undefined, spender)
  const pendingApproval = useHasPendingApproval(token?.address, spender)

  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    if (!amountToApprove || !spender) return ApprovalState.UNKNOWN
    if (amountToApprove.currency.isNative) return ApprovalState.APPROVED
    // we might not have enough data to know whether or not we need to approve
    if (!currentAllowance) return ApprovalState.UNKNOWN

    // amountToApprove will be defined if currentAllowance is
    return currentAllowance.lessThan(amountToApprove)
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED
  }, [amountToApprove, currentAllowance, pendingApproval, spender])

  const tokenContract = useTokenContract(token?.address)
  const addTransaction = useTransactionAdder()

  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily')
      return
    }
    if (!chainId) {
      console.error('no chainId')
      return
    }

    if (!token) {
      console.error('no token')
      return
    }

    if (!tokenContract) {
      console.error('tokenContract is null')
      return
    }

    if (!amountToApprove) {
      console.error('missing amount to approve')
      return
    }

    if (!spender) {
      console.error('no spender')
      return
    }

    let useExact = false
    const estimatedGas = await tokenContract.estimateGas.approve(spender, MaxUint256).catch(() => {
      // general fallback for tokens who restrict approval amounts
      useExact = true
      return tokenContract.estimateGas.approve(spender, amountToApprove.quotient.toString())
    })

    return tokenContract
      .approve(spender, useExact ? amountToApprove.quotient.toString() : MaxUint256, {
        gasLimit: calculateGasMargin(chainId, estimatedGas),
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'Approve ' + amountToApprove.currency.symbol,
          approval: { tokenAddress: token.address, spender },
        })
      })
      .catch((error: Error) => {
        console.debug('Failed to approve token', error)
        throw error
      })
  }, [approvalState, token, tokenContract, amountToApprove, spender, addTransaction, chainId])

  return [approvalState, approve]
}

const MAX = MaxUint256

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useSimpleApproveCallback(
  currency: Currency,
  border: BigNumber,
  spender?: string
): [ApprovalState, () => Promise<void>, BigNumber] {
  const { account, chainId } = useActiveWeb3React()
  const token = currency?.isToken ? currency : undefined
  const { currencyAmount: currentAllowance, bnAllowance } = useTokenAllowance(token, account ?? undefined, spender)
  const pendingApproval = useHasPendingApproval(token?.address, spender)

  const AmountToApprove = useMemo(() => CurrencyAmount.fromRawAmount(currency, MAX.toString()), [currency])

  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    if (!currency || !spender) return ApprovalState.UNKNOWN
    if (currency.isNative) return ApprovalState.APPROVED
    // we might not have enough data to know whether or not we need to approve
    if (!currentAllowance) return ApprovalState.UNKNOWN

    if (bnAllowance?.isZero() && border?.isZero()) return ApprovalState.NOT_APPROVED

    // amountToApprove will be defined if currentAllowance is
    return bnAllowance?.lt(border || ZERO)
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED
  }, [currency, currentAllowance, bnAllowance, pendingApproval, spender, border])

  const tokenContract = useTokenContract(token?.address)
  const addTransaction = useTransactionAdder()

  const estimateGasFunc = useCallback(async () => {
    if (!tokenContract || !spender) return ZERO

    const estimatedGas = await tokenContract.estimateGas.approve(spender, MaxUint256).catch(() => {
      // general fallback for tokens who restrict approval amounts

      return tokenContract.estimateGas.approve(spender, AmountToApprove.toString())
    })

    return estimatedGas
  }, [tokenContract, spender, AmountToApprove])

  const [estimatedGas, setEstimatedGas] = useState<BigNumber>(ZERO)

  useEffect(() => {
    estimateGasFunc().then((res) => {
      setEstimatedGas(res)
    })
  }, [estimateGasFunc])

  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily')
      return
    }
    if (!chainId) {
      console.error('no chainId')
      return
    }

    if (!token) {
      console.error('no token')
      return
    }

    if (!tokenContract) {
      console.error('tokenContract is null')
      return
    }

    if (!currency) {
      console.error('missing amount to approve')
      return
    }

    if (!spender) {
      console.error('no spender')
      return
    }

    let useExact = false
    const estimatedGas = await estimateGasFunc()

    useExact = true

    return tokenContract
      .approve(spender, useExact ? AmountToApprove.toString() : MaxUint256, {
        gasLimit: calculateGasMargin(chainId, estimatedGas),
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'Approve ' + currency.symbol,
          approval: { tokenAddress: token.address, spender },
        })
      })
      .catch((error: Error) => {
        console.debug('Failed to approve token', error)
        throw error
      })
  }, [
    approvalState,
    token,
    tokenContract,
    currency,
    spender,
    addTransaction,
    estimateGasFunc,
    chainId,
    AmountToApprove,
  ])

  return [approvalState, approve, estimatedGas]
}
