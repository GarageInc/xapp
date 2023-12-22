import { BigNumber } from '@ethersproject/bignumber'
import { Stack } from '@mui/material'
import { AppToggler } from 'components/AppToggler/AppToggler'
import { Card } from 'components/Card'
import { AutoColumn } from 'components/Column'
import Copy from 'components/Copy'
import { Box } from 'components/MUI'
import { RowGapped } from 'components/Row'
import { WalletActionBtn } from 'components/WalletActionBtn/WalletActionBtn'
import { StatusIconWrapper } from 'components/Web3Status'
import { getConnection } from 'connection'
import { NATIVE_TOKEN } from 'constants/fixedTokens'
import { useActiveWeb3React } from 'hooks/web3'
import TokensBalance from 'pages/Profile/TokensBalance'
import Transactions from 'pages/Profile/Transactions'
import { useState } from 'react'
import { useNativeCurrencyBalance } from 'state/wallet/hooks'
import { TYPE } from 'theme/theme'
import { shortenAddress } from 'utils'
import { formatDecimal } from 'utils/numberWithCommas'

import { Amount, Balance, CardWrapper, Header, PageContent, PageWrapper } from './styled'

const TABS = [
  {
    id: 'Tokens',
    title: 'Tokens',
  },
  {
    id: 'Transactions',
    title: 'Transactions',
  },
]

const BALANCE = BigNumber.from(12324312456789123456789n)

export default function Profile() {
  const { account, connector } = useActiveWeb3React()

  const [tab, setTab] = useState<string>(TABS[0].id)
  const balance = useNativeCurrencyBalance()

  const parts = formatDecimal(balance).split('.')

  const connectorName = getConnection(connector).getName()

  return (
    <PageWrapper>
      <PageContent>
        <Balance>
          <Amount>
            <TYPE.body fontSize={48} color="white">
              {parts[0]}
            </TYPE.body>
            <TYPE.body color="bg0" opacity={0.7} fontSize={32}>
              {`.${parts[1]} ${NATIVE_TOKEN.currency}`}
            </TYPE.body>
          </Amount>

          <TYPE.mediumHeader color="bg0" opacity={0.7} textAlign="center">
            Balance
          </TYPE.mediumHeader>
        </Balance>

        <CardWrapper>
          <Header>
            <RowGapped gap="12px">
              <StatusIconWrapper size={64} smallIconPosition="center" />
              <Stack gap="8px">
                <TYPE.subHeader color="dark40">{connectorName}</TYPE.subHeader>
                {account && (
                  <Copy toCopy={account} sx={{ padding: '0', flexDirection: 'row-reverse', gap: '6px' }}>
                    <TYPE.mediumHeader color="dark">{shortenAddress(account)}</TYPE.mediumHeader>
                  </Copy>
                )}
              </Stack>
            </RowGapped>
            <WalletActionBtn />
          </Header>

          <AppToggler tab={tab} setTab={setTab} tabs={TABS} />

          <Box maxHeight="170px" overflow="auto">
            <AutoColumn>
              <Card>
                {tab === TABS[0].id && <TokensBalance />}
                {tab === TABS[1].id && <Transactions />}
              </Card>
            </AutoColumn>
          </Box>
        </CardWrapper>
      </PageContent>
    </PageWrapper>
  )
}
