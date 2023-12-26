import { Currency } from '@uniswap/sdk-core'
import ImgGasTracker from 'components/icons/gas'
import { RowGapped } from 'components/Row'
import { LP_ADDRESS, useStakingContract } from 'constants/app-contracts'
import { BigNumber } from 'ethers'
import { useCurrency } from 'hooks/Tokens'
import { Dots } from 'pages/Pool/styleds'
import styled from 'styled-components'
import { TYPE } from 'theme/theme'
import { BN_1E18 } from 'utils/isZero'
import { formatDecimal } from 'utils/numberWithCommas'

import { BtnApprovTx } from '../../components/Button'
import { ApprovalState, useSimpleApproveCallback } from '../../hooks/useApproveCallback'
import { useArgentWalletContract } from '../../hooks/useArgentWalletContract'
import { useActiveWeb3React } from '../../hooks/web3'

const ApproveBtn = styled(BtnApprovTx)`
  ${({ theme }) => theme.mediaWidth.upToPhone`
    width: 100%;
  `};
`

interface ICheckerCommon {
  currency: Currency
  children?: any
}

interface IChecker extends ICheckerCommon {
  address?: string
  disabled?: boolean
  border?: BigNumber
}

const LOW_BORDER = BN_1E18

const ApproveCheckerERC20 = ({ currency, children, address, disabled = false, border = LOW_BORDER }: IChecker) => {
  const { chainId } = useActiveWeb3React()

  const argentWalletContract = useArgentWalletContract()

  // check whether the user has approved the router on the tokens
  const [approvalA, approveACallback, estimatedGas] = useSimpleApproveCallback(
    currency,
    border,
    chainId ? address : undefined
  )

  // we need an existence check on parsed amounts for single-asset deposits
  const showApprovalA = !argentWalletContract && approvalA !== ApprovalState.APPROVED && !!currency

  const needApprove = (approvalA === ApprovalState.NOT_APPROVED || approvalA === ApprovalState.PENDING) && showApprovalA

  const currencySymbol = currency?.symbol?.toUpperCase() === 'UNKNOWN' ? '' : currency?.symbol?.toUpperCase()

  return (
    <>
      {needApprove ? (
        <ApproveBtn onClick={approveACallback} disabled={approvalA === ApprovalState.PENDING || disabled}>
          {approvalA === ApprovalState.PENDING ? (
            <RowGapped gap="8px" align="center" flex="1" justify="center">
              <Dots>
                <TYPE.mediumHeader color="white">Approving</TYPE.mediumHeader>
                &nbsp;<TYPE.mediumHeader color="white">{currencySymbol}</TYPE.mediumHeader>
              </Dots>
            </RowGapped>
          ) : (
            <RowGapped gap="8px" align="center" flex="1" justify="center">
              <TYPE.mediumHeader color="white">Approve</TYPE.mediumHeader>
              <ImgGasTracker />

              {estimatedGas && <TYPE.body color="white">{formatDecimal(estimatedGas, 2, 5)}</TYPE.body>}
            </RowGapped>
          )}
        </ApproveBtn>
      ) : (
        children
      )}
    </>
  )
}

interface IApproveProps {
  currency?: Currency
  children?: any
  border?: BigNumber
}

export const ApproveCheckerStaking = ({ children, border }: IApproveProps) => {
  const contract = useStakingContract()
  const currency = useCurrency(LP_ADDRESS)

  if (!currency) {
    return null
  }

  return (
    <ApproveCheckerERC20 address={contract?.address} currency={currency} border={border}>
      {children}
    </ApproveCheckerERC20>
  )
}
