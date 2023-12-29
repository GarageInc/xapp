import { MENU_ARRAY } from 'constants/menu'
import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const MobileMenuWrapper = styled.div`
  position: fixed;
  box-sizing: content-box;
  bottom: -5px;

  padding-bottom: 45px;
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 45px;

  bottom: 0;
  right: 0;
  left: 0;

  z-index: 100;
  display: flex;
  background-color: transparent;
  background: linear-gradient(180deg, rgba(244, 245, 251, 0) 6.37%, #f4f5fb 27.63%);
  overflow-x: auto;
`

const MobileMenuButton = styled(NavLink)<{ disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
  padding: 6px;
  cursor: pointer;

  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};

  span {
    color: ${({ theme }) => theme.dark30};
  }

  &.active {
    span {
      color: ${({ theme }) => theme.dark};
    }
  }
`

const MobileIcon = styled.img`
  width: 52px;
  height: 52px;
  gap: 20px;
  background-color: ${({ theme }) => theme.light};
  border-radius: 50%;
  border: 6px solid ${({ theme }) => theme.light};
  box-shadow: 0px 3.333px 16.667px 0px rgba(40, 46, 63, 0.08);
`

const MobileMenuLabel = styled.span`
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.text1};
`

export const MobileMenu = () => {
  return (
    <>
      <MobileMenuWrapper>
        {MENU_ARRAY.map(({ href, src, label }) => (
          <MobileMenuButton to={href} key={href}>
            <MobileIcon src={src} />

            <MobileMenuLabel>{label}</MobileMenuLabel>
          </MobileMenuButton>
        ))}
      </MobileMenuWrapper>
    </>
  )
}
