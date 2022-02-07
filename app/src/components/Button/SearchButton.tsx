import React, { useCallback } from 'react'
import { TextStyle, useColorScheme, ViewStyle } from 'react-native'
import { styleType } from '@/utils/styles'
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
  const navigation = useNavigation()

  const onPress = useCallback(async () => {
    navigation.navigate('Search')
  }, [navigation])

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
