import { AppToggler } from 'components/AppToggler/AppToggler'
import { CardCenteredGap } from 'components/Card'
import { FormHeader } from 'components/FormHeader/FormHeader'
import { FormPageWrapper } from 'components/Forms/styled'
import { MENU } from 'constants/menu'
import { BigNumber } from 'ethers'
import { VestingBlock } from 'pages/Escrow/VestingBlock'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const TAB_IDS = {
  VESTING: 'vesting',
  CLAIM: 'claim',
}

const TABS = [
  {
    id: TAB_IDS.VESTING,
    title: 'Vesting',
  },
  {
    id: TAB_IDS.CLAIM,
    title: 'Claim XFI',
  },
]

export default function Escrow() {
  const [tab, setTab] = useState<string>(TABS[0].id)

  const [amount, setAmount] = useState<BigNumber | undefined>(undefined)

  useEffect(() => {
    setAmount(undefined)
  }, [tab])

  return (
    <StyledWrapper>
      <FormPageWrapper>
        <CardCenteredGap gap="16px">
          <FormHeader
            icon={MENU.escrow.src}
            label={MENU.escrow.label}
            explanation="The vesting of esXFI, i.e. the unfolding of esXFI into regular XFI, takes place gradually over 1 year and it is necessary that there are should be 10 times of LP XFI staked than the number of esXFI in the vesting, otherwise the vesting will be paused and will only continue when the condition is met again"
          />

          <AppToggler tab={tab} setTab={setTab} tabs={TABS} />

          {tab === TAB_IDS.VESTING ? <VestingBlock amount={amount} setAmount={setAmount} /> : 2}
        </CardCenteredGap>
      </FormPageWrapper>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.mediaWidth.upToTablet`
    margin: 70px auto 110px;
  `};

  ${({ theme }) => theme.mediaWidth.upToPhone`
    margin: 0;
  `};
`
