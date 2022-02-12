import React from 'react'
import { TextStyle, useColorScheme, ViewStyle } from 'react-native'
import { styleType } from '@/utils/styles'
import { Button } from './index'
import { makeStyles } from 'react-native-swag-styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR } from '@/CONSTANTS/COLOR'
import { createOpenLink } from 'react-native-open-maps'

type Props = {
  latitude: number
  longitude: number
  query?: string
}
type ComponentProps = Props & {
  onPress: () => void
}

const Component: React.FC<ComponentProps> = ({ onPress }) => {
  const styles = useStyles()
  return (
    <Button style={styles.container} onPress={onPress}>
      <Icon style={styles.icon} name={'map-search-outline'} size={20} />
    </Button>
  )
}

const Container: React.FC<Props> = (props) => {
  const { latitude, longitude } = props
  const onPress = createOpenLink({ latitude, longitude })

  return <Component {...props} onPress={onPress} />
}

export { Container as OpenMapButton }

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
