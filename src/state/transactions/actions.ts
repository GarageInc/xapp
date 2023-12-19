import { createAction } from '@reduxjs/toolkit'

import { INftAction } from './hooks'

interface SerializableTransactionReceipt {
  to: string
  from: string
  contractAddress: string
  transactionIndex: number
  blockHash: string
  transactionHash: string
  blockNumber: number
  status?: number
}

export const addTransaction = createAction<{
  chainId: number
  hash: string
  from: string
  approval?: { tokenAddress: string; spender: string }
  unstaking?: { tokenId: string; spender: string }
  zooClaim?: { recipient: string; tokenId: number }
  epochUpdating?: { recipient: string }
  chooseWinners?: { recipient: string; pairIndex: string }
  claim?: { recipient: string }
  truncateAndPair?: { recipient: string }
  summary?: string
  nftAction?: INftAction
}>('transactions/addTransaction')
export const clearAllTransactions = createAction<{ chainId: number }>('transactions/clearAllTransactions')
export const finalizeTransaction = createAction<{
  chainId: number
  hash: string
  receipt: SerializableTransactionReceipt
}>('transactions/finalizeTransaction')
export const checkedTransaction = createAction<{
  chainId: number
  hash: string
  blockNumber: number
}>('transactions/checkedTransaction')
