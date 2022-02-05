import React, { useCallback } from 'react'
import { TextStyle, useColorScheme, ViewStyle } from 'react-native'
import { styleType } from '@/utils/styles'
import { useDispatch } from 'react-redux'
import { enqueueToast } from '@/redux/modules/toast/actions'
import { Button } from './index'
import { makeStyles } from 'react-native-swag-styles'
import Icon from 'react-native-vector-icons/Fontisto'
import { COLOR } from '@/CONSTANTS/COLOR'
import { useNavigation } from '@react-navigation/native'

type Props = {}
type ComponentProps = Props & {
  onPress: () => void
}

const Component: React.FC<ComponentProps> = ({ onPress }) => {
  const styles = useStyles()
  return (
    <Button style={styles.container} onPress={onPress}>
      <Icon style={styles.icon} name="search" size={20} />
    </Button>
  )
}

const Container: React.FC<Props> = (props) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const onPress = useCallback(async () => {
    try {
      navigation.navigate('Search')
    } catch (error: any) {
      console.warn(`SearchButton#onPress`, error)
      dispatch(enqueueToast({ message: '失敗しました' }))
    }
  }, [navigation, dispatch])

  return <Component {...props} onPress={onPress} />
}

export { Container as SearchButton }

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
