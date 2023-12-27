import { MaxUint256 } from '@ethersproject/constants'
import { TransactionResponse } from '@ethersproject/providers'
import { Currency, CurrencyAmount } from '@uniswap/sdk-core'
import { TxTemplateTypes } from 'constants/transactions'
import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'
import { useCallback, useMemo } from 'react'
import { ZERO } from 'utils/isZero'

import { useHasPendingApproval, useTransactionAdder } from '../state/transactions/hooks'
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

const MAX = MaxUint256

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useSimpleApproveCallback(currency: Currency, border: BigNumber, spender?: string) {
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

  const [calledWallet, setCalledWallet] = useState<boolean>(false)

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

    setCalledWallet(true)
    return tokenContract
      .approve(spender, useExact ? AmountToApprove.toString() : MaxUint256, {
        gasLimit: calculateGasMargin(chainId, estimatedGas),
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'Approve ' + currency.symbol,
          approval: { tokenAddress: token.address, spender },
          type: TxTemplateTypes.Approved,
        })
      })
      .catch((error: Error) => {
        console.debug('Failed to approve token', error)
        throw error
      })
      .finally(() => {
        setCalledWallet(false)
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

  return {
    approvalState,
    approve,
    estimatedGas,
    calledWallet,
  }
}
