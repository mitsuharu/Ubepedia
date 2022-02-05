import React from 'react'
import { Text, TextStyle, useColorScheme, View, ViewStyle } from 'react-native'
import { contentInset } from '@/components/List/util'
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
      <View style={styles.view}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <SectionSeparator />
    </>
  )
}

const Container: React.FC<Props> = (props) => <Component {...props} />

export { Container as SectionHeader }

const useStyles = makeStyles(useColorScheme, (colorScheme) => ({
  view: styleType<ViewStyle>({
    height: 32,
    justifyContent: 'flex-end',
    paddingLeft: contentInset.left,
    paddingRight: contentInset.right,
  }),
  text: styleType<TextStyle>({
    color: COLOR(colorScheme).TEXT.SECONDARY,
    fontSize: 11,
    lineHeight: 26,
  }),
}))
