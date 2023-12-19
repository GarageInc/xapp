import { Flex } from 'rebass/styled-components'
import styled from 'styled-components'

const ShadowCard = styled(Flex).attrs({
  flexDirection: 'column',
})<{ gap?: string }>`
  box-shadow: 0px 4px 20px 0px rgba(40, 46, 63, 0.08);
  gap: ${({ gap }) => gap || '0px'};
`

const Card = styled(ShadowCard)<{ gap?: string }>`
  gap: ${({ gap }) => gap};
  border-radius: 24px;
  padding: 16px;
  background-color: ${({ theme }) => theme.light};
  box-shadow: 0px 4px 20px 0px rgba(40, 46, 63, 0.08);
`

export const GreyCard = styled(ShadowCard)`
  border-radius: 24px;
  padding: 12px;
  background-color: ${({ theme }) => theme.dark04};
  box-shadow: none;
`

export const CardCentered = styled(Card)`
  margin: auto;
  width: 100%;
`

export const CardCenteredGap = styled(Card)`
  margin: auto;
  width: 100%;
`
