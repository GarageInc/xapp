import questionIcon from 'assets/icons/question.svg'
import questionHoveredIcon from 'assets/icons/question-hover.svg'
import { MouseoverTooltip } from 'components/Tooltip'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { useCallback, useRef, useState } from 'react'
import styled from 'styled-components'

const SettingsBtn = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.dark04};
  display: flex;
  cursor: pointer;
`
const SettingsIcon = styled.img`
  margin: auto;
`

export const ExplanationBtn = ({ title }: { title: string }) => {
  const [hovered, setHovered] = useState<boolean>(false)
  const node = useRef<HTMLDivElement>()

  const onHide = useCallback(() => {
    setHovered(false)
  }, [])

  const toggle = useCallback(() => {
    setHovered((prev) => !prev)
  }, [])

  useOnClickOutside(node, onHide)

  return (
    <MouseoverTooltip text={title} placement="bottom-start">
      <SettingsBtn onClick={toggle}>
        <SettingsIcon src={hovered ? questionHoveredIcon : questionIcon}></SettingsIcon>
      </SettingsBtn>
    </MouseoverTooltip>
  )
}
