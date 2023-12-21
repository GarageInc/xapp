import { GreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import Loading from 'components/Loading'
import { RowBetween } from 'components/Row'
import { useStakingContract } from 'constants/app-contracts'
import { BigNumber } from 'ethers'
import { useApiCall } from 'hooks/useApiCall'
import { useMemo } from 'react'
import { useSingleCallResult } from 'state/multicall/hooks'
import styled from 'styled-components'
import { BN_1E18, ZERO } from 'utils/isZero'
import { formatDecimal } from 'utils/numberWithCommas'

const Label = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.dark40};
`

const Value = styled.div`
  font-weight: 500;
  font-size: 14px;
`

const ColumnStyled = styled(AutoColumn)`
  padding: 6px 0;
`

const PRICE_MULTIPLIER = 100

const usePriceBnModifier = (price: number) => {
  return useMemo(() => BigNumber.from(Math.floor(price * PRICE_MULTIPLIER)), [price])
}

const SECONDS_IN_YEAR = 31536000

const LP_PRICE = 1 // no DEXes atm

const useAPR = (rewardRateMethod: string, totalSupplyMethod: string, tokenPrice: number, lpPrice: number) => {
  const contract = useStakingContract()

  const rewardRate = useSingleCallResult(contract, rewardRateMethod)?.result?.[0] || ZERO
  const supply = useSingleCallResult(contract, totalSupplyMethod)?.result?.[0] || ZERO

  const tokenPriceBn = usePriceBnModifier(tokenPrice)
  const lpPriceBn = usePriceBnModifier(lpPrice)

  const apr = useMemo(() => {
    const tokenAllocation: BigNumber = rewardRate.mul(tokenPriceBn).mul(SECONDS_IN_YEAR)
    const lpAllocation: BigNumber = supply.mul(lpPriceBn)

    return lpAllocation.isZero() ? ZERO : tokenAllocation.mul(BN_1E18).mul(100).div(lpAllocation)
  }, [rewardRate, supply, tokenPriceBn, lpPriceBn])

  return {
    apr,
    loading: apr.isZero(),
  }
}

// https://dev.mineplex.cash/api/2.0/payment/currency?limit=160

const usePrices = () => {
  const { data } = useApiCall('https://dev.mineplex.cash/api/2.0/payment/currency?limit=160')

  return useMemo(() => {
    if (!data || !data.docs) return

    const newPrices: Record<string, number> = {}

    data.docs.forEach((item: any) => {
      newPrices[item.symbol] = 1 / item.rate
    })

    return newPrices
  }, [data])
}

export const ApyBlock = () => {
  const prices = usePrices()

  console.log('prices', prices)
  const ethPrice = prices ? prices['eth'] : 0
  const xfiPrice = prices ? prices['xfi'] : 0

  const { apr: esXfiApr, loading: loadingEsXfiApr } = useAPR('nativeRewardRate', 'totalSupplyLP', xfiPrice, LP_PRICE)
  const { apr: wethApr, loading: loadingWethApr } = useAPR('tokenRewardRate', 'totalSupplyLP', ethPrice, LP_PRICE)

  return (
    <GreyCard>
      <ColumnStyled gap="6px">
        <RowBetween>
          <Label>wETH APR</Label>

          <Value>
            <Loading loading={loadingWethApr}>{formatDecimal(wethApr, 2)}%</Loading>
          </Value>
        </RowBetween>

        <RowBetween>
          <Label>esXFI APR</Label>

          <Value>
            <Loading loading={loadingEsXfiApr}>{formatDecimal(esXfiApr, 2)}%</Loading>
          </Value>
        </RowBetween>

        <RowBetween>
          <Label>Boost percentage</Label>

          <Value>-%</Value>
        </RowBetween>
      </ColumnStyled>
    </GreyCard>
  )
}
