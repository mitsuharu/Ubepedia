import { COLOR } from '@/CONSTANTS/COLOR'
import {
  DarkTheme as RNDarkTheme,
  DefaultTheme as RNDefaultTheme,
  Theme as RNTheme,
} from '@react-navigation/native'
import { ColorSchemeName } from 'react-native'

type RNColors = Pick<RNTheme, 'colors'>['colors']

const colors = (colorScheme: ColorSchemeName): RNColors => {
  const themeColors =
    colorScheme === 'dark' ? RNDarkTheme.colors : RNDefaultTheme.colors

  return {
    ...themeColors,
    primary: COLOR(colorScheme).TEXT.SECONDARY,
    background: COLOR(colorScheme).BACKGROUND.SECONDARY,
    card: COLOR(colorScheme).BACKGROUND.SECONDARY,
    text: COLOR(colorScheme).TEXT.PRIMARY,
    border: COLOR(colorScheme).BACKGROUND.PRIMARY,
    notification: 'red',
  }
}

/**
 * React Navigation のテーマ
 */
export const NavigationTheme = (colorScheme: ColorSchemeName): RNTheme => {
  const theme = colorScheme === 'dark' ? RNDarkTheme : RNDefaultTheme
  return {
    ...theme,
    colors: {
      ...colors(colorScheme),
    },
  }
}
