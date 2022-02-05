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
  const { name, depiction } = item

  const url = useMemo(() => {
    if (item instanceof CivicFacility || item instanceof Sculpture) {
      return item.homepage
    } else {
      return undefined
    }
  }, [item])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
      headerRight: () => {
        return <ShareButton title={name} url={url} />
      },
      hideWhenScrolling: true,
    })
  }, [name, navigation, url])

  return <Component {...props} title={name} imageUrl={depiction} />
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
