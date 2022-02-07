import React, { useCallback } from 'react'
import { TextStyle, useColorScheme, ViewStyle } from 'react-native'
import { styleType } from '@/utils/styles'
import { Button } from './index'
import { makeStyles } from 'react-native-swag-styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { COLOR } from '@/CONSTANTS/COLOR'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootParams } from '@/routes/root.params'

type Props = {}
type ComponentProps = Props & {
  onPress: () => void
}

const Component: React.FC<ComponentProps> = ({ onPress }) => {
  const styles = useStyles()
  return (
    <Button style={styles.container} onPress={onPress}>
      <Icon style={styles.icon} name="settings-sharp" size={20} />
    </Button>
  )
}

const Container: React.FC<Props> = (props) => {
  const navigation = useNavigation<NavigationProp<RootParams>>()

  const onPress = useCallback(async () => {
    navigation.navigate('SettingRoute')
  }, [navigation])

  return <Component {...props} onPress={onPress} />
}

export { Container as SettingButton }

const useStyles = makeStyles(useColorScheme, (colorScheme) => ({
  container: styleType<ViewStyle>({
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
  }),
  icon: styleType<TextStyle>({
    color: COLOR(colorScheme).TEXT.SECONDARY,
  }),
}))
