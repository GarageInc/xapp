import { TransactionResponse } from '@ethersproject/providers'
import { BigNumber, PopulatedTransaction } from 'ethers'
import { useCallback, useState } from 'react'
import { useAddPopup } from 'state/application/hooks'
import { useHasPendingNftAction, useTransactionAdder } from 'state/transactions/hooks'
import { calculateGasMargin } from 'utils/calculateGasMargin'

import { useActiveWeb3React } from '../web3'

type AsyncFunc = (data?: any) => Promise<PopulatedTransaction | undefined>

export const useTxTemplate = (
  actionType: string,
  successMsg: string,
  funcTxData: AsyncFunc,
  txCallback?: (tx: TransactionResponse) => void,
  failMsg?: any,
  manualGazLimit?: BigNumber
) => {
  const { account, chainId, provider: library } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()

  const [disabled, setDisabled] = useState(false)

  const pending = useHasPendingNftAction('', '', actionType)

  const addPopup = useAddPopup()

  const action = useCallback(
    async (data?: any) => {
      if (!chainId || !library || !account) return

      if (account) {
        const txData = await funcTxData(data)

        const txn = {
          ...txData,
          value: txData?.value || '0x0',
        }

        let estimatedCost = manualGazLimit || undefined

        if (!estimatedCost) {
          try {
            estimatedCost = await library.getSigner().estimateGas(txn)
          } catch (error) {
            addPopup({
              msg: {
                success: false,
                title: <>Transaction Error</>,
                description: 'Can not estimate gas usage for transaction or not enough balance',
              },
            })
            console.error('Failed to estimate transaction', error)
          }
        }

        try {
          const newTxn = {
            ...txn,
            gasLimit: estimatedCost ? calculateGasMargin(chainId, estimatedCost) : manualGazLimit,
          }

          return library
            .getSigner()
            .sendTransaction(newTxn)
            .then((response: TransactionResponse) => {
              txCallback && txCallback(response)
              addTransaction(response, {
                summary: successMsg,
                nftAction: {
                  nftAddress: '',
                  tokenId: '',
                  type: actionType,
                },
              })
            })
        } catch (error) {
          console.error('Failed to send transaction', error)

          setDisabled(true)

          failMsg &&
            addPopup({
              msg: {
                success: false,
                title: <>Transaction Denied</>,
                description: failMsg,
              },
            })

          // we only care if the error is something _other_ than the user rejected the tx
          if (error?.code !== 4001) {
            console.error(error)
          }
        }
      } else {
        return
      }
    },
    [
      successMsg,
      manualGazLimit,
      actionType,
      funcTxData,
      account,
      addTransaction,
      chainId,
      library,
      addPopup,
      failMsg,
      txCallback,
    ]
  )

  return {
    action,
    pending,
    disabled,
  }
}
