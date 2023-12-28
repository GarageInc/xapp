import walletSvg from 'assets/icons/wallet.svg'
import { AmountInputWithMax } from 'components/blocks/AmountInput/AmountInput'
import { TokenSymbol } from 'components/blocks/AmountInput/useAppCoins'
import { ButtonPurple } from 'components/Button'
import { GreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import ImgGasTracker from 'components/icons/gas'
import Loading from 'components/Loading'
import { Divider } from 'components/MUI'
import { Row, RowGapped } from 'components/Row'
import { TransactionInfo } from 'components/TransactionInfo/TransactionInfo'
import { TxStatusView } from 'components/TxStatusView/TxStatusView'
import { Duration, intervalToDuration } from 'date-fns'
import { BigNumber } from 'ethers'
import ms from 'ms'
import VestingStatus from 'pages/Escrow/VestingStatus'
import { useMemo, useState } from 'react'
import { TYPE } from 'theme/theme'
import { formattedDuration } from 'utils/date'
import { formatDecimal } from 'utils/numberWithCommas'

// MOCKS
// TODO add isLPLoading, lpAmount, balance, pending, balance, decimals
const balance = BigNumber.from(12324312456789123456789n)
const decimals = 18
const pending = false
const isTxLoading = false

// for Progress
// const xfiAmount = amount ? formatDecimal(amount, decimals) : '0'
const esXfiAmount = BigNumber.from(100000000000000000000n)
const isEsXfiLoading = false
const vestingStartTime = Date.now() - ms('120 days')

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

const ClaimingBlock = ({ amount, setAmount }: { amount?: BigNumber; setAmount: (v?: BigNumber) => void }) => {
  const [hash, setHash] = useState<string | undefined>('')

  const [integer, decimal] = formatDecimal(balance).split('.')

  const calculatedTime = useMemo(() => {
    let timeLeft: Duration = { seconds: 0 }

    if (vestingStartTime) {
      const endTime = vestingStartTime + ms(`1y`)

      if (endTime <= Date.now()) {
        timeLeft = { seconds: 0 }
      } else {
        timeLeft = intervalToDuration({ start: Date.now(), end: endTime })
      }
    }
    return timeLeft
  }, [])

  return (
    <>
      <AutoColumn gap="16px">
        {hash ? (
          <TxStatusView
            amount={amount}
            isLoading={isTxLoading}
            color="fuchsia"
            hash={hash}
            token="xfi"
            txInfo={txInfo()}
          />
        ) : (
          <>
            <GreyCard gap="16px">
              <TYPE.body fontWeight={400} color="dark40">
                Claim
              </TYPE.body>
              <AmountInputWithMax
                inputValue={amount}
                setInputValue={(v) => v && setAmount(v)}
                decimals={decimals}
                maxValue={balance}
                rightTokenOptions={VESTING_TOKENS}
                rightToken={VESTING_TOKENS[0]}
                bgColor="main25"
                walletIcon={walletSvg}
              />
            </GreyCard>

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
                    Claim
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

            <TransactionInfo info={txInfo()} />

            <Divider />

            <VestingStatus
              xfiAmount={amount}
              esXfiAmount={esXfiAmount}
              isEsXfiLoading={isEsXfiLoading}
              timeLeft={formattedDuration(calculatedTime)}
            />
          </>
        )}
      </AutoColumn>
    </>
  )
}

const VESTING_TOKENS = [TokenSymbol.xfi].map((token) => ({
  symbol: token,
}))

export default ClaimingBlock
