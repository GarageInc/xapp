import { Stack } from '@mui/material'
import TokenLargeBadge from 'components/badges/TokenLargeBadge/TokenLargeBadge'
import TokenLargeWhiteBgBadge from 'components/badges/TokenLargeWhiteBgBadge/TokenLargeWhiteBgBadge'
import { Box, Menu } from 'components/MUI'

import { IPickerToken } from './useAmountInput'
import { IAppToken, TokenSymbol } from './useAppCoins'

interface IRightTokenSelector {
  value: IAppToken
  options?: IPickerToken[]
  onChangeRightToken?: (symbol: TokenSymbol) => void
}

export const RightTokenSelector = ({ value, options, onChangeRightToken }: IRightTokenSelector) => {
  if (options && options.length > 1) {
    return (
      <Menu trigger={<TokenLargeWhiteBgBadge variant={value.symbol} />} isChildrenCloseMenu>
        <Stack gap="6px">
          {options.map(({ symbol }, index) => (
            <Box
              key={`${symbol}_${index}`}
              onClick={() => {
                onChangeRightToken?.(symbol)
              }}
              sx={{ cursor: 'pointer' }}
            >
              <TokenLargeBadge variant={symbol} />
            </Box>
          ))}
        </Stack>
      </Menu>
    )
  } else {
    return <TokenLargeBadge variant={value.symbol} />
  }
}
