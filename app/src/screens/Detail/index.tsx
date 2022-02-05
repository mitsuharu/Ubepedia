import React, { useLayoutEffect } from 'react'
import { Text, TextStyle, useColorScheme, View, ViewStyle } from 'react-native'
import { styleType } from '@/utils/styles'
import { makeStyles } from 'react-native-swag-styles'
import { COLOR } from '@/CONSTANTS/COLOR'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { MainParams } from '@/routes/main.params'
import { ShareButton } from '@/components/Button/ShareButton'

type ParamsProps = RouteProp<MainParams, 'Detail'>

type Props = {}
type ComponentProps = Props & {
  title: string
  imageUrl: string | undefined
}

const Component: React.FC<ComponentProps> = ({ title }) => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  )
}

const Container: React.FC<Props> = (props) => {
  const navigation = useNavigation()
  const route = useRoute<ParamsProps>()
  const { item } = route.params
  const { name, url, imageUrl } = item

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
      headerRight: () => <ShareButton title={name} url={url} />,
      hideWhenScrolling: true,
    })
  }, [navigation, name, url])

  return <Component {...props} title={name} imageUrl={imageUrl} />
}

export { Container as Detail }

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
