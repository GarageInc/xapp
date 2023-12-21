import disconnectIcon from 'assets/icons/out.svg'
import reloadIcon from 'assets/icons/reload.svg'
import { ActionBtn } from 'components/ActionBtn/ActionBtn'
import { Menu, StyledMenuItem } from 'components/MUI'
import { RowGapped } from 'components/Row'
import { useDisconnectWallet } from 'hooks/useDisconnectWallet'
import styled from 'styled-components'
import { TYPE } from 'theme/theme'

export const WalletActionBtn = () => {
  const { disconnect } = useDisconnectWallet()

  return (
    <Menu trigger={<ActionBtn />}>
      <StyledMenuItem>
        {/*TODO add Resync balance onClick*/}
        <RowGapped gap="8px">
          <Icon src={reloadIcon} />
          <TYPE.body fontWeight={400}>Resync balance </TYPE.body>
        </RowGapped>
      </StyledMenuItem>
      <StyledMenuItem>
        <RowGapped gap="8px" onClick={disconnect}>
          <Icon src={disconnectIcon} />
          <TYPE.body fontWeight={400} color="error">
            Disconnect wallet
          </TYPE.body>
        </RowGapped>
      </StyledMenuItem>
    </Menu>
  )
}

const Icon = styled.img`
  width: 20px;
  height: 20px;
`
