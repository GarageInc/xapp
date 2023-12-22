import { RowBetween, RowGapped } from 'components/Row'
import React, { FC } from 'react'
import { TYPE } from 'theme/theme'

type Props = {
  icon: string
  operationType: string
  date: string
}
const TransactionAccordionHeader: FC<Props> = ({ icon, operationType, date }) => {
  return (
    <RowBetween padding="12px 16px">
      <RowGapped gap="30px">
        <img src={icon} alt={operationType} />
        <TYPE.body color="dark">{operationType}</TYPE.body>
      </RowGapped>

      <TYPE.body color="dark70" minWidth="fit-content">
        {date}
      </TYPE.body>
    </RowBetween>
  )
}

export default TransactionAccordionHeader
