import { Button } from '@/components/Button'
import { COLOR } from '@/CONSTANTS/COLOR'
import { UbeDataType } from '@/database/ube/type'
import { styleType } from '@/utils/styles'
import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useMemo } from 'react'
import { Text, TextStyle, useColorScheme } from 'react-native'
import { makeStyles } from 'react-native-swag-styles'

const MAX_SUBTITLE_LENGTH = 20

type Props = {
  item: UbeDataType
}
type ComponentProps = Props & {
  title: string
  subtitle?: string
  onPress: () => void
}

const Component: React.FC<ComponentProps> = ({ title, subtitle, onPress }) => {
  const styles = useStyles()
  return (
    <Button onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </Button>
  )
}

const Container: React.FC<Props> = (props) => {
  const { item } = props
  const { name, description } = item
  const navigation = useNavigation()

  const subtitle = useMemo(() => {
    if (!!description && description.length > MAX_SUBTITLE_LENGTH) {
      return description.slice(0, MAX_SUBTITLE_LENGTH) + '...'
    }
    return description
  }, [description])

  const onPress = useCallback(() => {
    navigation.navigate('Detail', { item })
  }, [item, navigation])

  return (
    <Component {...props} title={name} subtitle={subtitle} onPress={onPress} />
  )
}

export { Container as UbeCallout }

const useStyles = makeStyles(useColorScheme, (colorScheme) => ({
  title: styleType<TextStyle>({
    color: COLOR(colorScheme).TEXT.PRIMARY,
    fontWeight: '500',
  }),
  subtitle: styleType<TextStyle>({
    color: COLOR(colorScheme).TEXT.SECONDARY,
    fontWeight: '300',
  }),
}))
