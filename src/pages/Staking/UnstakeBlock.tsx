import { AmountInputWithMax } from 'components/blocks/AmountInput/AmountInput'
import { ButtonPrimary } from 'components/Button'
import { GreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import { WarningBlock } from 'components/WarningBlock/WarningBlock'
import { BigNumber } from 'ethers'
import { useCallback, useState } from 'react'

export const UnstakeBlock = () => {
  const [amountFirst, setAmountFirst] = useState<number | undefined>()

  const onMaxHandlerFirst = useCallback(() => {
    setAmountFirst(100)
  }, [])

  return (
    <>
      <AutoColumn gap="16px">
        <GreyCard>
          <AmountInputWithMax
            value={amountFirst}
            onUserInput={(v) => v && setAmountFirst(+v)}
            onMaxClicked={onMaxHandlerFirst}
            decimals={18}
            maxValue={BigNumber.from(100)}
            bgColor="appViolet25"
          />
        </GreyCard>

        <GreyCard gap="16px">
          <AmountInputWithMax value={amountFirst} decimals={18} maxValue={BigNumber.from(100)} />
          <AmountInputWithMax value={amountFirst} decimals={18} maxValue={BigNumber.from(100)} />
        </GreyCard>
      </AutoColumn>

      <WarningBlock text="Your Bonus points will be burned and you will loose busted APY" />

      <ButtonPrimary disabled={amountFirst === 0}>Enter an amount</ButtonPrimary>
    </>
  )
}
