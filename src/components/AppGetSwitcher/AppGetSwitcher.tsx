import networkDirectionIcon from 'assets/icons/network-direction.svg'
import { ButtonEmpty } from 'components/Button'
import EthereumIcon from 'components/icons/ethereum'
import XfiIcon from 'components/icons/xfi'
import { CHAIN_INFO, SupportedChainId } from 'constants/chainsinfo'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Color, ThemeColors } from 'theme/styled'
import { TYPE } from 'theme/theme'

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
}

interface IProps {
  mainColor?: Color
  subColor?: Color
  bgColor?: Color
}

export const AppGetSwitcher = ({ mainColor = 'green', subColor = 'green35', bgColor = 'green15' }: IProps) => {
  const { chainId = SupportedChainId.MAINNET } = useActiveWeb3React()

  const [fromChain, setFromChain] = useState(GET_CHAINS[chainId])
  const [toChain, setToChain] = useState(GET_CHAINS[fromChain.toChain])

  const onSwapChain = useCallback(() => {
    setFromChain(toChain)
    setToChain(fromChain)
  }, [toChain, fromChain])

  return (
    <Wrapper>
      <ButtonStyled bgColor={bgColor}>
        {fromChain.icon(mainColor)}

        <TYPE.body fontWeight={500} color={mainColor} margin="0 9px 0 4px">
          {CHAIN_INFO[fromChain.from].label}
        </TYPE.body>

        <TYPE.body fontWeight={500} color={subColor} marginLeft="auto">
          From
        </TYPE.body>
      </ButtonStyled>

      <Icon src={networkDirectionIcon} onClick={onSwapChain} />

      <ButtonStyled bgColor={bgColor}>
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
