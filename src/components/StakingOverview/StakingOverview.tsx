import questionIcon from 'assets/icons/question-main.svg'
import iconEsXfi from 'assets/icons/tokens/esXfi.svg'
import iconLp from 'assets/icons/tokens/lp.svg'
import iconWeth from 'assets/icons/tokens/weth.svg'
import { AutoColumn } from 'components/Column'
import { ExplanationBtn } from 'components/ExplanationBtn/ExplanationBtn'
import Loading from 'components/Loading'
import { RowBetween } from 'components/Row'
import { useStakingContract } from 'constants/app-contracts'
import { useCallStaticMethod } from 'hooks/useCallStaticMethod'
import { useActiveWeb3React } from 'hooks/web3'
import { useMemo } from 'react'
import styled from 'styled-components'
import { Color } from 'theme/styled'
import { TYPE } from 'theme/theme'
import { formatDecimal } from 'utils/numberWithCommas'

const Header = styled.div`
  font-weight: 500;
  font-size: 20px;
`

const Label = styled.div`
  display: flex;
  align-items: center;
`

const Value = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

const Icon = styled.img<{ bgColor: Color }>`
  background-color: ${({ bgColor, theme }) => (bgColor in theme ? (theme as any)[bgColor] : theme.bg1)};
  width: 22px;
  height: 22px;
  margin-right: 4px;
  border-radius: 50%;
`

const RowBetweenStyled = styled(RowBetween)<{ bgColor: Color }>`
  background-color: ${({ bgColor, theme }) => (bgColor in theme ? (theme as any)[bgColor] : theme.bg1)};
  padding: 8px 12px;
  border-radius: 24px;
  height: 44px;
`

const SettingsBtn = styled.div`
  border-radius: 50%;
  width: 24px;
  height: 24px;
  background-color: ${({ theme }) => theme.main25};
  display: flex;
  cursor: pointer;
`

const SettingsIcon = styled.img`
  margin: auto;
  width: 11px;
  height: 11px;
`

const deps: string[] = []

export const StakingOverview = () => {
  const contract = useStakingContract()
  const { account } = useActiveWeb3React()

  const params = useMemo(() => {
    return {
      from: account,
    }
  }, [account])

  const { loading, result } = useCallStaticMethod(contract, 'getUserData', deps, params)

  const [lpXfiStaked, bonusPoints, esXfiEarned, wethEarned] = !loading && Array.isArray(result) ? result : [0, 0, 0, 0]

  return (
    <>
      <Header>Overview</Header>

      <AutoColumn gap="8px">
        <RowBetweenStyled bgColor="appViolet15">
          <Label>
            <Icon src={iconLp} bgColor="appViolet15" />
            <TYPE.body fontWeight={500} color="appViolet">
              lpXFI
            </TYPE.body>
          </Label>

          <Value>
            <TYPE.body fontWeight={500} color="appViolet">
              <Loading loading={loading}>{formatDecimal(lpXfiStaked, 2)}</Loading>
            </TYPE.body>
            <TYPE.body fontWeight={500} color="appViolet50">
              Staked
            </TYPE.body>
          </Value>
        </RowBetweenStyled>

        <RowBetweenStyled bgColor="dark06">
          <Label>
            <Icon src={iconWeth} bgColor="dark15" />
            <TYPE.body fontWeight={500} color="dark80">
              WETH
            </TYPE.body>
          </Label>

          <Value>
            <TYPE.body fontWeight={500} color="dark80">
              <Loading loading={loading}>{formatDecimal(wethEarned, 2)}</Loading>
            </TYPE.body>
            <TYPE.body fontWeight={500} color="dark40">
              Earned
            </TYPE.body>
          </Value>
        </RowBetweenStyled>

        <RowBetweenStyled bgColor="fuchsia15">
          <Label>
            <Icon src={iconEsXfi} bgColor="fuchsia15" />
            <TYPE.body fontWeight={500} color="fuchsia">
              esXFI
            </TYPE.body>
          </Label>

          <Value>
            <TYPE.body fontWeight={500} color="fuchsia">
              <Loading loading={loading}>{formatDecimal(esXfiEarned, 2)}</Loading>
            </TYPE.body>
            <TYPE.body fontWeight={500} color="fuchsia50">
              Earned
            </TYPE.body>
          </Value>
        </RowBetweenStyled>

        <RowBetweenStyled bgColor="main15">
          <Label>
            <TYPE.body fontWeight={500} color="main">
              lpXFI
            </TYPE.body>
          </Label>

          <Value>
            <TYPE.body fontWeight={500} color="main">
              <Loading loading={loading}>{formatDecimal(bonusPoints, 2)}</Loading>
              &nbsp; Bonus Points
            </TYPE.body>

            <ExplanationBtn title="Bonus Points increase the share of total rewards received, as 1 Bonus Point = 1 LP XFI Staked. Bonus Points are awarded permanently at 100% APR of the number of LP XFIs staked.">
              <SettingsBtn>
                <SettingsIcon src={questionIcon} />
              </SettingsBtn>
            </ExplanationBtn>
          </Value>
        </RowBetweenStyled>
      </AutoColumn>
    </>
  )
}
