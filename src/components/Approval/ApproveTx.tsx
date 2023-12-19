import { Currency } from '@uniswap/sdk-core'
import { BigNumber, Contract } from 'ethers'
import { Dots } from 'pages/Pool/styleds'
import { useMemo } from 'react'
import { useSingleCallResult } from 'state/multicall/hooks'
import styled from 'styled-components'
import { BN_1E18 } from 'utils/isZero'

import { BtnApprovTx } from '../../components/Button'
import { ApprovalState, useSimpleApproveCallback } from '../../hooks/useApproveCallback'
import { useArgentWalletContract } from '../../hooks/useArgentWalletContract'
import { useActiveWeb3React } from '../../hooks/web3'

const ApproveBtn = styled(BtnApprovTx)`
  background: none;
  border: 1px solid #e0ab43;
  color: #e0ab43;

  &:hover {
    color: white;
    background: #e0ab43;
  }

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

export const useIsOwner = (tokenId: string | BigNumber | undefined, contract: Contract | null) => {
  const { account } = useActiveWeb3React()

  const deps = useMemo(() => [tokenId], [tokenId])
  const currentOwner = useSingleCallResult(contract, 'ownerOf', deps)?.result?.[0]

  return currentOwner?.toLowerCase() === account?.toLowerCase()
}

const LOW_BORDER = BN_1E18

const ApproveCheckerERC20 = ({ currency, children, address, disabled = false, border = LOW_BORDER }: IChecker) => {
  const { chainId } = useActiveWeb3React()

  const argentWalletContract = useArgentWalletContract()

  // check whether the user has approved the router on the tokens
  const [approvalA, approveACallback] = useSimpleApproveCallback(currency, border, chainId ? address : undefined)

  // we need an existence check on parsed amounts for single-asset deposits
  const showApprovalA = !argentWalletContract && approvalA !== ApprovalState.APPROVED && !!currency

  const needApprove = (approvalA === ApprovalState.NOT_APPROVED || approvalA === ApprovalState.PENDING) && showApprovalA

  const currencySymbol = currency?.symbol?.toUpperCase() === 'UNKNOWN' ? '' : currency?.symbol?.toUpperCase()
  return (
    <>
      {needApprove ? (
        <ApproveBtn onClick={approveACallback} disabled={approvalA === ApprovalState.PENDING || disabled}>
          {approvalA === ApprovalState.PENDING ? (
            <Dots>
              <>Approving </>
              &nbsp;{currencySymbol}
            </Dots>
          ) : (
            <>
              <>Approve </>&nbsp;
              {currencySymbol}
            </>
          )}
        </ApproveBtn>
      ) : (
        children
      )}
    </>
  )
}

interface IApproveProps {
  currency: Currency
  children?: any
  border?: BigNumber
}

export const ApproveCheckerBattleSwaps = ({ currency, children, border }: IApproveProps) => {
  const address = ''

  return (
    <ApproveCheckerERC20 address={address} currency={currency} border={border}>
      {children}
    </ApproveCheckerERC20>
  )
}
