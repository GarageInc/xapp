import Column from 'components/Column'
import { Accordion, Box, Divider } from 'components/MUI'
import { RowBetween } from 'components/Row'
import { FIXED_TOKENS_OBJECT } from 'constants/fixedTokens'
import { TRANSACTION_TYPES } from 'constants/transactions'
import { format } from 'date-fns'
import { isSameDay } from 'date-fns/isSameDay'
import TransactionAccordionDetails from 'pages/Profile/TransactionAccordionDetails'
import TransactionAccordionHeader from 'pages/Profile/TransactionAccordionHeader'
import { useMemo } from 'react'
import { useAllTransactions } from 'state/transactions/hooks'
import { TransactionDetails } from 'state/transactions/types'
import { TYPE } from 'theme/theme'
import { fullDate } from 'utils/date'

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
      {sortedTransactions.map(({ addedTime, hash }, index) => {
        const date = renderDate({
          current: addedTime,
          previous: sortedTransactions[index - 1] && sortedTransactions[index - 1].addedTime,
        })

        // TODO get different type based on transaction
        const operation = TRANSACTION_TYPES.swap

        // TODO replace mock data
        const from = {
          symbol: FIXED_TOKENS_OBJECT.eth.symbol,
          icon: FIXED_TOKENS_OBJECT.eth.icon,
          amount: '32',
        }

        const to = {
          symbol: FIXED_TOKENS_OBJECT.xfi.symbol,
          icon: FIXED_TOKENS_OBJECT.xfi.icon,
          amount: '24',
        }

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
                    <TransactionAccordionDetails from={from} to={to} hash={hash} totalFee="1" />
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
