import React from 'react'
import { Text, TextStyle, useColorScheme, View, ViewStyle } from 'react-native'
import { styleType } from '@/utils/styles'
import { makeStyles } from 'react-native-swag-styles'
import { COLOR } from '@/CONSTANTS/COLOR'

type Props = {
  title: string
}
type ComponentProps = Props & {}

const Component: React.FC<ComponentProps> = ({ title }) => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  )
}

const Container: React.FC<Props> = (props) => {
  return <Component {...props} />
}

export { Container as SectionHeader }

const useStyles = makeStyles(useColorScheme, (colorScheme) => ({
  container: styleType<ViewStyle>({
    backgroundColor: COLOR(colorScheme).BACKGROUND.SECONDARY,
    paddingVertical: 8,
    paddingHorizontal: 16,
  }),
  text: styleType<TextStyle>({
    fontWeight: '500',
    color: COLOR(colorScheme).TEXT.PRIMARY,
  }),
}))
