import { INftAction } from './hooks'

export interface SerializableTransactionReceipt {
  to: string
  from: string
  contractAddress: string
  transactionIndex: number
  blockHash: string
  transactionHash: string
  blockNumber: number
  status?: number
}

/**
 * Be careful adding to this enum, always assign a unique value (typescript will not prevent duplicate values).
 * These values is persisted in state and if you change the value it will cause errors
 */
enum TransactionType {
  APPROVAL = 0,
}

interface BaseTransactionInfo {
  type: TransactionType
}

interface ApproveTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.APPROVAL
  tokenAddress: string
  spender: string
  amount: string
}

export type TransactionInfo = ApproveTransactionInfo

export interface TransactionDetails {
  hash: string
  receipt?: SerializableTransactionReceipt
  lastCheckedBlockNumber?: number
  addedTime: number
  confirmedTime?: number
  deadline?: number
  from: string
  info: TransactionInfo
  nonce?: number
  cancelled?: boolean

  approval?: { tokenAddress: string; spender: string }
  unstaking?: { tokenId: string; spender: string }
  summary?: string
  nftAction?: INftAction
}
