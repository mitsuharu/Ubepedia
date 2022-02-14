import { COLOR } from '@/CONSTANTS/COLOR'
import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper'
import { ColorSchemeName, useColorScheme } from 'react-native'
import { useEffect, useState } from 'react'

type PaperTheme = typeof PaperDefaultTheme
type PaperColors = Pick<PaperTheme, 'colors'>['colors']

const makeColors = (colorScheme: ColorSchemeName): PaperColors => {
  const themeColors =
    colorScheme === 'dark' ? PaperDarkTheme.colors : PaperDefaultTheme.colors

  return {
    ...themeColors,
    primary: COLOR(colorScheme).TEXT.SECONDARY,
    background: COLOR(colorScheme).BACKGROUND.SECONDARY,
    text: COLOR(colorScheme).TEXT.PRIMARY,
    notification: 'red',
  }
}

const makeTheme = (colorScheme: ColorSchemeName): PaperTheme => {
  const theme = colorScheme === 'dark' ? PaperDarkTheme : PaperDefaultTheme
  return {
    ...theme,
    colors: {
      ...makeColors(colorScheme),
    },
  }
}

/**
 * react-native-paperのテーマ
 */
export const usePaperTheme = (): PaperTheme => {
  const colorScheme = useColorScheme()
  const [theme, setTheme] = useState<PaperTheme>(makeTheme(colorScheme))

  useEffect(() => {
    setTheme(makeTheme(colorScheme))
  }, [colorScheme])

  return theme
}
