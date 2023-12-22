import bridgeSvg from 'assets/images/menu/bridge.svg'
import getSvg from 'assets/images/menu/get.svg'
import rewardsSvg from 'assets/images/menu/rewards.svg'
import stakingSvg from 'assets/images/menu/staking.svg'
import swapSvg from 'assets/images/menu/swap.svg'
import { Paths } from 'constants/paths'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const MobileMenuWrapper = styled.div`
  position: fixed;
  padding-bottom: 40px;
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
        <MobileMenuButton to={Paths.GET}>
          <MobileIcon src={getSvg} />

          <MobileMenuLabel>Get</MobileMenuLabel>
        </MobileMenuButton>

        <MobileMenuButton to={Paths.SWAP}>
          <MobileIcon src={swapSvg} />
          <MobileMenuLabel>Swap</MobileMenuLabel>
        </MobileMenuButton>

        <MobileMenuButton to={Paths.BRIDGE}>
          <MobileIcon src={bridgeSvg} />
          <MobileMenuLabel>Bridge</MobileMenuLabel>
        </MobileMenuButton>

        <MobileMenuButton to={Paths.STAKING}>
          <MobileIcon src={stakingSvg} />
          <MobileMenuLabel>Staking</MobileMenuLabel>
        </MobileMenuButton>

        <MobileMenuButton to={Paths.REWARDS}>
          <MobileIcon src={rewardsSvg} />
          <MobileMenuLabel>Rewards</MobileMenuLabel>
        </MobileMenuButton>
      </MobileMenuWrapper>
    </>
  )
}
