import { Stack } from '@mui/material'
import { Divider } from 'components/MUI'
import { RowBetween } from 'components/Row'
import { TYPE } from 'theme/theme'

export default function TokensBalance() {
  return (
    <Stack divider={<Divider />} gap="12px">
      <RowBetween padding="0 8px">
        <TYPE.body color="dark70">Token</TYPE.body>
        <TYPE.body color="dark70">Balance</TYPE.body>
      </RowBetween>
      {/*<Coins>2</Coins>*/}
    </Stack>
  )
}
