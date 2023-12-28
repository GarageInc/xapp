import bridgeSvg from 'assets/images/menu/bridge.svg'
import escrowSvg from 'assets/images/menu/escrow.svg'
import getSvg from 'assets/images/menu/get.svg'
import rewardsSvg from 'assets/images/menu/rewards.svg'
import stakingSvg from 'assets/images/menu/staking.svg'
import swapSvg from 'assets/images/menu/swap.svg'
import { Paths } from 'constants/paths'

export const MENU = {
  get: { href: Paths.GET, src: getSvg, label: 'Get' },
  swap: { href: Paths.SWAP, src: swapSvg, label: 'Swap' },
  bridge: { href: Paths.BRIDGE, src: bridgeSvg, label: 'Bridge' },
  staking: { href: Paths.STAKING, src: stakingSvg, label: 'Staking' },
  rewards: { href: Paths.REWARDS, src: rewardsSvg, label: 'Rewards' },
  escrow: { href: Paths.ESCROW, src: escrowSvg, label: 'Escrow' },
}

export const MENU_ARRAY = Object.values(MENU)
