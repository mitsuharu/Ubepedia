import React, { useLayoutEffect } from 'react'
import { Text, TextStyle, useColorScheme, View, ViewStyle } from 'react-native'
import { styleType } from '@/utils/styles'
import { makeStyles } from 'react-native-swag-styles'
import { COLOR } from '@/CONSTANTS/COLOR'
import { useNavigation } from '@react-navigation/native'

type Props = {}
type ComponentProps = Props & {}

const Component: React.FC<ComponentProps> = () => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search</Text>
    </View>
  )
}

const Container: React.FC<Props> = (props) => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '設定',
    })
  }, [navigation])

  return <Component {...props} />
}

export { Container as Setting }

const useStyles = makeStyles(useColorScheme, (colorScheme) => ({
  container: styleType<ViewStyle>({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR(colorScheme).BACKGROUND.PRIMARY,
  }),
  text: styleType<TextStyle>({
    textAlign: 'center',
  }),
}))
