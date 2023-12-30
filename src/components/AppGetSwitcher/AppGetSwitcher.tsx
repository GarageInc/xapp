import networkDirectionIcon from 'assets/icons/network-direction.svg'
import { ButtonEmpty } from 'components/Button'
import { useHandleChainSwitch } from 'components/Header/NetworkSelector'
import EthereumIcon from 'components/icons/ethereum'
import XfiIcon from 'components/icons/xfi'
import { CHAIN_INFO, SupportedChainId } from 'constants/chainsinfo'
import { BigNumber } from 'ethers'
import { useCallback } from 'react'
import styled from 'styled-components'
import { Color, ThemeColors } from 'theme/styled'
import { TYPE } from 'theme/theme'
import { ZERO } from 'utils/isZero'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 24px;
  height: 44px;
  width: fit-content;

  ${({ theme }) => theme.mediaWidth.upToPhone`
    width: 100%;
  `};
`

const ButtonStyled = styled(ButtonEmpty)<{ bgColor?: Color }>`
  background-color: ${({ theme, bgColor }) => (theme as any)[bgColor || 'green15']};
  border: none;
  cursor: pointer;
  padding: 10px 8px;
  border-radius: 24px;
  height: 100%;
`

const Icon = styled.img`
  cursor: pointer;
`

interface IChainGetInfo {
  [key: number]: {
    from: number
    icon: any
    toChain: number
  }
}

const GET_CHAINS: IChainGetInfo = {
  [SupportedChainId.BNB]: {
    from: SupportedChainId.BNB,
    icon: (color: ThemeColors) => <XfiIcon color={color} />,
    toChain: SupportedChainId.ARBITRUM_ONE,
  },

  [SupportedChainId.MAINNET]: {
    from: SupportedChainId.MAINNET,
    icon: (color: ThemeColors) => <EthereumIcon color={color} />,
    toChain: SupportedChainId.XFI_TESTNET,
  },
  [SupportedChainId.XFI_TESTNET]: {
    from: SupportedChainId.XFI_TESTNET,
    icon: (color: ThemeColors) => <XfiIcon color={color} />,
    toChain: SupportedChainId.MAINNET,
  },

  [SupportedChainId.ARBITRUM_ONE]: {
    from: SupportedChainId.ARBITRUM_ONE,
    icon: (color: ThemeColors) => <XfiIcon color={color} />,
    toChain: SupportedChainId.BNB,
  },
}

interface IProps {
  mainColor?: Color
  subColor?: Color
  bgColor?: Color
  fromChainId: SupportedChainId
  toChainId: SupportedChainId
  onUserInput: (v: BigNumber) => void
  setToChainId: (v: SupportedChainId) => void
}

const getTargetBridgeChain = (fromChain: SupportedChainId) => {
  let toChain

  switch (+fromChain) {
    case SupportedChainId.BNB: {
      toChain = SupportedChainId.ARBITRUM_ONE
      break
    }
    case SupportedChainId.ARBITRUM_ONE: {
      toChain = SupportedChainId.BNB
      break
    }
    case SupportedChainId.MAINNET: {
      toChain = SupportedChainId.BNB
      break
    }
    default: {
      toChain = SupportedChainId.MAINNET
      console.error('Bridge error')
    }
  }

  return toChain
}

export const AppGetSwitcher = ({
  mainColor = 'green',
  subColor = 'green35',
  bgColor = 'green15',
  fromChainId,
  toChainId,
  onUserInput,
  setToChainId,
}: IProps) => {
  const handleChainSwitch = useHandleChainSwitch()

  const toggleCurrentChain = useCallback(
    (chain: SupportedChainId) => {
      handleChainSwitch(chain, true)
      onUserInput(ZERO)

      setToChainId(getTargetBridgeChain(chain))
    },
    [handleChainSwitch, setToChainId, onUserInput]
  )

  const handleChainChange = useCallback(
    (changeToChain: SupportedChainId) => {
      setToChainId(changeToChain)
    },
    [setToChainId]
  )

  const handleExchange = useCallback(() => {
    handleChainSwitch(toChainId, true)
    onUserInput(ZERO)
    setToChainId(fromChainId)
  }, [fromChainId, handleChainSwitch, toChainId, onUserInput, setToChainId])

  const fromChain = GET_CHAINS[fromChainId]
  const toChain = GET_CHAINS[fromChain.toChain]

  return (
    <Wrapper>
      <ButtonStyled bgColor={bgColor} onClick={() => toggleCurrentChain(fromChain.from)}>
        {fromChain.icon(mainColor)}

        <TYPE.body fontWeight={500} color={mainColor} margin="0 9px 0 4px">
          {CHAIN_INFO[fromChain.from].label}
        </TYPE.body>

        <TYPE.body fontWeight={500} color={subColor} marginLeft="auto">
          From
        </TYPE.body>
      </ButtonStyled>

      <Icon src={networkDirectionIcon} onClick={handleExchange} />

      <ButtonStyled bgColor={bgColor} onClick={() => handleChainChange(toChain.from)}>
        {toChain.icon(mainColor)}

        <TYPE.body fontWeight={500} color={mainColor} margin="0 9px 0 4px">
          {CHAIN_INFO[toChain.from].label}
        </TYPE.body>

        <TYPE.body fontWeight={500} color={subColor} marginLeft="auto">
          To
        </TYPE.body>
      </ButtonStyled>
    </Wrapper>
  )
}
