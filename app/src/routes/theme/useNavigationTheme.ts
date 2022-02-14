import { COLOR } from '@/CONSTANTS/COLOR'
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme as NavigationTheme,
} from '@react-navigation/native'
import { ColorSchemeName, useColorScheme } from 'react-native'
import { useEffect, useState } from 'react'

type RNColors = Pick<NavigationTheme, 'colors'>['colors']

const makeColors = (colorScheme: ColorSchemeName): RNColors => {
  const themeColors =
    colorScheme === 'dark'
      ? NavigationDarkTheme.colors
      : NavigationDefaultTheme.colors

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

const makeTheme = (colorScheme: ColorSchemeName): NavigationTheme => {
  const theme =
    colorScheme === 'dark' ? NavigationDarkTheme : NavigationDefaultTheme
  return {
    ...theme,
    colors: {
      ...makeColors(colorScheme),
    },
  }
}

/**
 * React Navigation のテーマ
 */
export const useNavigationTheme = (): NavigationTheme => {
  const colorScheme = useColorScheme()
  const [theme, setTheme] = useState<NavigationTheme>(makeTheme(colorScheme))

  useEffect(() => {
    setTheme(makeTheme(colorScheme))
  }, [colorScheme])

  return theme
}
