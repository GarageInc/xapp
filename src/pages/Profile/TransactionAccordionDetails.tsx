import Column from 'components/Column'
import Copy from 'components/Copy'
import { Box, Divider } from 'components/MUI'
import { RowGapped } from 'components/Row'
import { NATIVE_TOKEN, TokenSymbol } from 'constants/fixedTokens'
import React, { FC } from 'react'
import styled from 'styled-components'
import { TYPE } from 'theme/theme'
import { Amount, Hash, Icon } from 'types/common'
import { shortenString } from 'utils'

type TokenAmount = {
  symbol: TokenSymbol
  amount: Amount
  icon: Icon
}

type Props = {
  from: TokenAmount
  to: TokenAmount
  hash: Hash
  totalFee: Amount
}

const TransactionAccordionDetails: FC<Props> = (props) => {
  const { from, to, totalFee, hash } = props
  return (
    <DetailsWrapper>
      <RowGapped justify="space-between" gap="12px">
        <Token {...from} />
        <TYPE.subHeader color="dark" opacity={0.4}>
          to
        </TYPE.subHeader>
        <Token {...to} />
      </RowGapped>
      <Column gap="14px">
        <Box m="6px 0">
          <Divider />
        </Box>
        <RowGapped justify="space-between" gap="12px">
          <Column gap="4px">
            <TYPE.body color="dark">Hash</TYPE.body>
            <RowGapped gap="6px">
              <Copy toCopy={hash} sx={{ padding: '0', flexDirection: 'row-reverse', gap: '4px' }}>
                <TYPE.body color="dark70">{shortenString(hash)}</TYPE.body>
              </Copy>
            </RowGapped>
          </Column>
          <Column gap="4px">
            <TYPE.body color="dark">Total Fee</TYPE.body>

            <TYPE.body color="dark70">{`${totalFee} ${NATIVE_TOKEN.label}`}</TYPE.body>
          </Column>
        </RowGapped>
      </Column>
    </DetailsWrapper>
  )
}

const Token: FC<TokenAmount> = ({ icon, amount, symbol }) => {
  return (
    <RowGapped width="fit-content" gap="5px" p="5px 7.5px">
      <RowGapped gap="7px">
        <img src={icon} alt="symbol" />
        <TYPE.mediumHeader color="dark" fontSize={17.5}>
          {symbol.toUpperCase()}
        </TYPE.mediumHeader>
      </RowGapped>
      <TYPE.mediumHeader color="dark" fontSize={17.5}>
        {amount}
      </TYPE.mediumHeader>
    </RowGapped>
  )
}

const DetailsWrapper = styled.div`
  padding: 12px 12px 16px 12px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.dark04};
`
export default TransactionAccordionDetails
