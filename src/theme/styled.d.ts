import { FlattenSimpleInterpolation, ThemedCssFunction } from 'styled-components'

export type Color = string
export interface Colors {
  // base
  white: Color
  black: Color

  light: Color

  dark: Color
  dark80: Color
  dark70: Color
  dark40: Color
  dark30: Color
  dark25: Color
  dark15: Color
  dark10: Color
  dark08: Color
  dark06: Color
  dark04: Color
  dark02: Color

  // text
  text1: Color
  text2: Color
  text3: Color
  text4: Color

  red: Color
  grey: Color

  // backgrounds / greys
  bg0: Color
  bg1: Color
  bg2: Color
  bg3: Color

  boxShadow: Color

  modalBG: Color

  //blues
  primary1: Color
  primary2: Color

  // other
  red: Color
  red60: Color
  red35: Color
  red25: Color
  red15: Color

  green: Color
  green35: Color
  green25: Color
  green15: Color

  main: Color
  main35: Color
  main25: Color
  main15: Color

  cian: Color
  cian35: Color
  cian25: Color
  cian15: Color

  appViolet: Color
  appViolet50: Color
  appViolet35: Color
  appViolet25: Color
  appViolet15: Color

  fuchsia: Color
  fuchsia35: Color
  fuchsia25: Color
  fuchsia15: Color
  fuchsia50: Color

  darkOrange: Color
  darkOrange60: Color
  darkOrange35: Color
  darkOrange25: Color
  darkOrange15: Color

  orange: Color
  orange35: Color
  orange25: Color
  orange15: Color

  error: Color
  error70: Color
  error10: Color
  error06: Color
}

declare module 'styled-components' {
  export interface DefaultTheme extends Colors {
    // media queries
    mediaWidth: {
      upToPhone: ThemedCssFunction<DefaultTheme>
      upToExtraSmall: ThemedCssFunction<DefaultTheme>
      upToTablet: ThemedCssFunction<DefaultTheme>
      upToSmall: ThemedCssFunction<DefaultTheme>
      upToMedium: ThemedCssFunction<DefaultTheme>
      upToLarge: ThemedCssFunction<DefaultTheme>
      upToExtraLarge: ThemedCssFunction<DefaultTheme>
    }

    // css snippets
    flexColumnNoWrap: FlattenSimpleInterpolation
    flexRowNoWrap: FlattenSimpleInterpolation
  }
}
