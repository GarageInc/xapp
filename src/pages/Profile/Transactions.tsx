import Column from 'components/Column'
import { Accordion, Box, Divider } from 'components/MUI'
import { RowBetween } from 'components/Row'
import { TRANSACTION_TYPES } from 'constants/transactions'
import { format } from 'date-fns'
import { isSameDay } from 'date-fns'
import { BigNumber } from 'ethers'
import TransactionAccordionDetails from 'pages/Profile/TransactionAccordionDetails'
import TransactionAccordionHeader from 'pages/Profile/TransactionAccordionHeader'
import { useMemo } from 'react'
import { useAllTransactions } from 'state/transactions/hooks'
import { TransactionDetails } from 'state/transactions/types'
import { TYPE } from 'theme/theme'
import { fullDate } from 'utils/date'
import { formatDecimal } from 'utils/numberWithCommas'

const Transactions = () => {
  const allTransactions = useAllTransactions()

  const sortedTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.sort((a: TransactionDetails, b: TransactionDetails) => {
      return b.addedTime - a.addedTime
    })
  }, [allTransactions])

  return (
    <>
      {sortedTransactions.map((tx, index) => {
        const { addedTime, hash, summary, type, txData } = tx

        const date = renderDate({
          current: addedTime,
          previous: sortedTransactions[index - 1] && sortedTransactions[index - 1].addedTime,
        })

        if (!type || !txData) return null

        // TODO get different type based on transaction
        const operation = TRANSACTION_TYPES[type]

        return (
          <Column key={hash}>
            {!!date && (
              <Column>
                <Box p="0 16px">{date}</Box>
                <Box m="12px 0">
                  <Divider />
                </Box>
              </Column>
            )}
            <RowBetween mt={date ? 0 : '12px'}>
              <Accordion
                headerSlot={
                  <TransactionAccordionHeader
                    icon={operation.icon}
                    operationType={operation.label}
                    date={format(addedTime, 'hh:mm aaa')}
                  />
                }
                // TODO get fee
                detailsSlot={
                  <Box p="0 16px 12px">
                    <TransactionAccordionDetails
                      hash={hash}
                      summary={summary}
                      totalFee={formatDecimal(BigNumber.from(txData.gasLimit), 2, 5)}
                    />
                  </Box>
                }
              />
            </RowBetween>
          </Column>
        )
      })}
    </>
  )
}

const renderDate = ({ current, previous }: { current: number; previous?: number }) => {
  const formattedDate = <TYPE.mediumHeader>{fullDate(current, 'MMMM dd, yyyy')}</TYPE.mediumHeader>

  if (!previous) {
    return formattedDate
  }

  if (!isSameDay(new Date(current), new Date(previous))) {
    return formattedDate
  }
  return null
}

export default Transactions
