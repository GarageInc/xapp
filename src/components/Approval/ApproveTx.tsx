import { Currency } from '@uniswap/sdk-core'
import ImgEllipse from 'components/icons/ellipse'
import ImgGasTracker from 'components/icons/gas'
import { RowBetween, RowGapped } from 'components/Row'
import { LP_ADDRESS, useStakingContract } from 'constants/app-contracts'
import { BigNumber } from 'ethers'
import { useCurrency } from 'hooks/Tokens'
import { Dots } from 'pages/Pool/styleds'
import styled from 'styled-components'
import { rotate, TYPE } from 'theme/theme'
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

const EllipseContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background-color: ${({ theme }) => theme.darkOrange};

  animation: 2s ${rotate} linear infinite;
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
  const {
    approvalState: approvalA,
    approve: approveACallback,
    estimatedGas,
    calledWallet,
  } = useSimpleApproveCallback(currency, border, chainId ? address : undefined)

  // we need an existence check on parsed amounts for single-asset deposits
  const showApprovalA = !argentWalletContract && approvalA !== ApprovalState.APPROVED && !!currency

  const needApprove = (approvalA === ApprovalState.NOT_APPROVED || approvalA === ApprovalState.PENDING) && showApprovalA

  const currencySymbol = currency?.symbol?.toUpperCase() === 'UNKNOWN' ? '' : currency?.symbol?.toUpperCase()

  if (calledWallet) {
    return (
      <ApproveBtn disabled>
        <RowBetween align="center" flex="1">
          <TYPE.mediumHeader color="darkOrange35">
            <Dots>Confirm in your wallet</Dots>
          </TYPE.mediumHeader>
          <EllipseContainer>
            <ImgEllipse />
          </EllipseContainer>
        </RowBetween>
      </ApproveBtn>
    )
  }

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
