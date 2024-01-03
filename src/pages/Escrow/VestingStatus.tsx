import { BigNumber } from '@ethersproject/bignumber'
import Column from 'components/Column'
import Loading from 'components/Loading'
import { ProgressBar } from 'components/ProgressBar/ProgressBar'
import { RowBetween } from 'components/Row'
import TokenSmallBadge from 'components/badges/TokenSmallBadge/TokenSmallBadge'
import { FC, useMemo } from 'react'
import styled from 'styled-components'
import { TYPE } from 'theme/theme'
import { ZERO } from 'utils/isZero'
import { formatDecimal } from 'utils/numberWithCommas'

type Props = {
  xfiAmount?: BigNumber
  esXfiAmount?: BigNumber
  isEsXfiLoading?: boolean
  timeLeft?: string
  percentsCompleted?: number
}

const VestingStatus: FC<Props> = ({
  xfiAmount = ZERO,
  esXfiAmount = ZERO,
  isEsXfiLoading = false,
  timeLeft = '0s',
  percentsCompleted = 0,
}) => {
  // position for progress bar(number)
  const barPosition = useMemo(() => {
    if (!xfiAmount || esXfiAmount.isZero()) return 0

    return xfiAmount.mul(100).div(esXfiAmount).toNumber()
  }, [xfiAmount, esXfiAmount])

  return (
    <Column gap="16px">
      <Column gap="24px">
        <TYPE.mediumHeader color="text1">Vesting status</TYPE.mediumHeader>
        <Column gap="4px">
          <RowBetween>
            <TokenSmallBadge variant="xfi">{formatDecimal(xfiAmount)}</TokenSmallBadge>
            <TYPE.subHeader color="dark" opacity={0.4}>
              out of
            </TYPE.subHeader>
            <TokenSmallBadge variant="esXFI">
              <Loading loading={isEsXfiLoading}> {formatDecimal(esXfiAmount)}</Loading>
            </TokenSmallBadge>
          </RowBetween>

          <ProgressBar position={percentsCompleted} color="main" />
        </Column>
      </Column>
      <TimeLeftCard>
        <RowBetween padding="6px 0">
          <TYPE.subHeader color="dark40">Time left</TYPE.subHeader>
          <TYPE.subHeader fontWeight={500} color="dark">
            {timeLeft}
          </TYPE.subHeader>
        </RowBetween>

        <RowBetween padding="6px 0">
          <TYPE.subHeader color="dark40">Сompletion percentage</TYPE.subHeader>
          <TYPE.subHeader fontWeight={500} color="dark">
            {percentsCompleted.toFixed(2)}%
          </TYPE.subHeader>
        </RowBetween>
      </TimeLeftCard>
    </Column>
  )
}

const TimeLeftCard = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.dark02};
`

export default VestingStatus
