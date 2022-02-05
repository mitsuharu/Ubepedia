import React, { useEffect, useLayoutEffect, useMemo } from 'react'
import { Text, TextStyle, useColorScheme, View, ViewStyle } from 'react-native'
import { styleType } from '@/utils/styles'
import { makeStyles } from 'react-native-swag-styles'
import { COLOR } from '@/CONSTANTS/COLOR'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { MainParams } from '@/routes/main.params'
import { ShareButton } from '@/components/Button/ShareButton'
import { CivicFacility } from '@/database/ube/model/CivicFacility'
import { Sculpture } from '@/database/ube/model/Sculpture'
import { convertUbeData } from '@/database/ube/util/convertUbeData'

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
  const { title, url, imageUrl } = convertUbeData(item)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
      headerRight: () => <ShareButton title={title} url={url} />,
      hideWhenScrolling: true,
    })
  }, [navigation, title, url])

  return <Component {...props} title={title} imageUrl={imageUrl} />
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
