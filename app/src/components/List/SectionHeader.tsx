import React from 'react'
import { Text, TextStyle, useColorScheme, View, ViewStyle } from 'react-native'
import { COLOR } from '@/CONSTANTS/COLOR'
import { SectionSeparator } from './Separator'
import { makeStyles } from 'react-native-swag-styles'
import { styleType } from '@/utils/styles'

type Props = { title?: string }

const Component: React.FC<Props> = ({ title }) => {
  const styles = useStyles()
  return (
    <>
      <SectionSeparator />
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <SectionSeparator />
    </>
  )
}

const Container: React.FC<Props> = (props) => <Component {...props} />

export { Container as SectionHeader }

const useStyles = makeStyles(useColorScheme, (colorScheme) => ({
  container: styleType<ViewStyle>({
    backgroundColor: COLOR(colorScheme).BACKGROUND.SECONDARY,
    paddingVertical: 8,
    paddingHorizontal: 16,
  }),
  text: styleType<TextStyle>({
    fontWeight: '500',
    color: COLOR(colorScheme).TEXT.SECONDARY,
  }),
}))
