import React from 'react'
import { Text, TextStyle, useColorScheme, View, ViewStyle } from 'react-native'
import { styleType } from '@/utils/styles'
import { makeStyles } from 'react-native-swag-styles'
import { COLOR } from '@/CONSTANTS/COLOR'

type Props = {}
type ComponentProps = Props & {}

const Component: React.FC<ComponentProps> = ({}) => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>detail</Text>
    </View>
  )
}

const Container: React.FC<Props> = (props) => {
  return <Component {...props} />
}

export { Container as Detail }

const useStyles = makeStyles(useColorScheme, (colorScheme) => ({
  container: styleType<ViewStyle>({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR(colorScheme).BACKGROUND.SECONDARY,
  }),
  text: styleType<TextStyle>({
    textAlign: 'center',
  }),
}))
