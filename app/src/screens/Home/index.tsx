import React, { useCallback } from 'react'
import { Text, TextStyle, useColorScheme, View, ViewStyle } from 'react-native'
import { styleType } from '@/utils/styles'
import { makeStyles } from 'react-native-swag-styles'
import { COLOR } from '@/CONSTANTS/COLOR'
import { useNavigation } from '@react-navigation/native'

type Props = {}
type ComponentProps = Props & {
  onPress: () => void
}

const Component: React.FC<ComponentProps> = ({ onPress }) => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <Text style={styles.text} onPress={onPress}>
        home
      </Text>
    </View>
  )
}

const Container: React.FC<Props> = (props) => {
  const navigation = useNavigation()

  const onPress = useCallback(() => {
    navigation.navigate('Detail')
  }, [navigation])

  return <Component {...props} onPress={onPress} />
}

export { Container as Home }

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
