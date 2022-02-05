import React, { useCallback } from 'react'
import { TextStyle, useColorScheme, ViewStyle } from 'react-native'
import { styleType } from '@/utils/styles'
import { useDispatch } from 'react-redux'
import { enqueueToast } from '@/redux/modules/toast/actions'
import { Button } from './index'
import { makeStyles } from 'react-native-swag-styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { COLOR } from '@/CONSTANTS/COLOR'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { SettingParams } from '@/routes/setting.params'

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
  const dispatch = useDispatch()
  const navigation = useNavigation<NavigationProp<SettingParams>>()

  const onPress = useCallback(async () => {
    try {
      navigation.navigate('Setting')
    } catch (error: any) {
      console.warn(`SearchButton#onPress`, error)
      dispatch(enqueueToast({ message: '失敗しました' }))
    }
  }, [navigation, dispatch])

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
