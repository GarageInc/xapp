import iconLp from 'assets/icons/tokens/lp.svg'
import walletSvg from 'assets/icons/wallet.svg'
import { AmountInputWithMax } from 'components/blocks/AmountInput/AmountInput'
import { TokenSymbol } from 'components/blocks/AmountInput/useAppCoins'
import { ButtonPurple } from 'components/Button'
import { GreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import EarnedToken from 'components/EarnedToken/EarnedToken'
import ImgGasTracker from 'components/icons/gas'
import Loading from 'components/Loading'
import { Divider } from 'components/MUI'
import { Row, RowGapped } from 'components/Row'
import { TransactionInfo } from 'components/TransactionInfo/TransactionInfo'
import { TxStatusView } from 'components/TxStatusView/TxStatusView'
import { WarningBlock } from 'components/WarningBlock/WarningBlock'
import { BigNumber } from 'ethers'
import { useState } from 'react'
import { TYPE } from 'theme/theme'
import { formatDecimal } from 'utils/numberWithCommas'

// MOCKS
// TODO add isLPLoading, lpAmount, balance, pending, balance, decimals
const lpAmount = formatDecimal(BigNumber.from(123243189123456789n), 2)
const balance = BigNumber.from(12324312456789123456789n)
const decimals = 18
const isLPLoading = false
const pending = false
const isTxLoading = false
const txInfo = () => {
  const promise = new Promise<BigNumber>((resolve) => {
    resolve(BigNumber.from(12324312456789123456789n))
  })

  return {
    estimatedGasLimitFunc: () =>
      promise.then((res) => {
        return res
      }),
  }
}

const VestingBlock = ({ amount, setAmount }: { amount?: BigNumber; setAmount: (v?: BigNumber) => void }) => {
  const [hash, setHash] = useState<string | undefined>('')

  const [integer, decimal] = formatDecimal(balance).split('.')

  return (
    <>
      <AutoColumn gap="16px">
        {hash ? (
          <TxStatusView
            amount={amount}
            isLoading={isTxLoading}
            processLabel="You are starting to vest"
            completedLabel="Vesting has started!"
            color="fuchsia"
            hash={hash}
            token="esXFI"
          />
        ) : (
          <>
            <GreyCard gap="16px">
              <TYPE.body fontWeight={400} color="dark40">
                You vest
              </TYPE.body>
              <AmountInputWithMax
                inputValue={amount}
                setInputValue={(v) => v && setAmount(v)}
                decimals={decimals}
                maxValue={balance}
                rightTokenOptions={VESTING_TOKENS}
                rightToken={VESTING_TOKENS[0]}
                bgColor="fuchsia15"
                walletIcon={walletSvg}
              />
            </GreyCard>
            <WarningBlock text="When you begin vesting esXFI it will no longer generate rewards" />

            <ButtonPurple
              disabled={!amount}
              onClick={() => {
                // TODO add vest action after clicking
                setHash('aascas121e42')
              }}
            >
              {amount ? (
                <Loading loading={pending} loadingLabel="Vesting">
                  <RowGapped justify="center" gap="10px">
                    Vest
                    <RowGapped width="fit-content" gap="5px">
                      <ImgGasTracker />
                      <RowGapped gap="4px">
                        <TYPE.body color="light" opacity={0.5}>
                          $
                        </TYPE.body>
                        <Row align="flex-end">
                          <TYPE.body color="light">{integer}</TYPE.body>
                          {decimal && <TYPE.body fontSize="11px" color="light">{`.${decimal}`}</TYPE.body>}
                        </Row>
                      </RowGapped>
                    </RowGapped>
                  </RowGapped>
                </Loading>
              ) : (
                'Enter an amount'
              )}
            </ButtonPurple>
          </>
        )}

        <TransactionInfo info={txInfo()} />

        <Divider />

        <EarnedToken
          icon={iconLp}
          label="lpXFI"
          labelColor="appViolet"
          bgColor="appViolet15"
          isLoading={isLPLoading}
          iconBgColor="appViolet15"
          amount={lpAmount}
          amountTail={
            <TYPE.body fontWeight={500} color="appViolet50">
              Staked
            </TYPE.body>
          }
        />
      </AutoColumn>
    </>
  )
}

const VESTING_TOKENS = [TokenSymbol.esXFI].map((token) => ({
  symbol: token,
}))

export default VestingBlock
