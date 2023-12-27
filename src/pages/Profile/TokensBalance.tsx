import { Stack } from '@mui/material'
import Column from 'components/Column'
import { Divider } from 'components/MUI'
import { RowBetween, RowGapped } from 'components/Row'
import TokenBalance from 'components/TokenBalance/TokenBalance'
import { FIXED_TOKENS } from 'constants/fixedTokens'
import { TYPE } from 'theme/theme'

export default function TokensBalance() {
  return (
    <Stack divider={<Divider />} gap="12px">
      <RowBetween padding="0 8px">
        <TYPE.body color="dark70">Token</TYPE.body>
        <TYPE.body color="dark70">Balance</TYPE.body>
      </RowBetween>

      {FIXED_TOKENS.map(({ icon, symbol, label, currency, token_address }) => {
        return (
          <RowBetween key={symbol}>
            <RowGapped gap="12px" width="fit-content">
              <img src={icon} alt={symbol} />
              <Column>
                <TYPE.body color="dark">{label}</TYPE.body>

                <TYPE.body color="dark70">{currency}</TYPE.body>
              </Column>
            </RowGapped>
            <RowGapped width="fit-content" gap="4px">
              <TokenBalance coin={{ symbol }} typographyProps={{ fontSize: '16px' }} />
              {currency}
            </RowGapped>
          </RowBetween>
        )
      })}
    </Stack>
  )
}
