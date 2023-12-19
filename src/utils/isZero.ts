import { BigNumber } from '@ethersproject/bignumber'

/**
 * Returns true if the string value is zero in hex
 * @param hexNumberString
 */
export default function isZero(hexNumberString: string) {
  return /^0x0*$/.test(hexNumberString)
}

export const ZERO = BigNumber.from(0)
export const BN_1E18 = BigNumber.from('1000000000000000000')
export const BN_1E24 = BigNumber.from('1000000000000000000000000')
export const BN_1E30 = BigNumber.from('1000000000000000000000000000000')
export const MINUS_ONE = BigNumber.from(-1)
