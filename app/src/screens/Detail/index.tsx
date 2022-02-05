import React, { useLayoutEffect } from 'react'
import { ScrollView, TextStyle, useColorScheme, ViewStyle } from 'react-native'
import { styleType } from '@/utils/styles'
import { makeStyles } from 'react-native-swag-styles'
import { COLOR } from '@/CONSTANTS/COLOR'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { MainParams } from '@/routes/main.params'
import { ShareButton } from '@/components/Button/ShareButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UbeDataType } from '@/database/ube/type'
import { HeaderSection } from './Cells/HeaderSection'

type ParamsProps = RouteProp<MainParams, 'Detail'>

type Props = {}
type ComponentProps = Props & {
  item: UbeDataType
}

const Component: React.FC<ComponentProps> = ({ item }) => {
  const styles = useStyles()

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        <HeaderSection item={item} />
      </ScrollView>
    </SafeAreaView>
  )
}

const Container: React.FC<Props> = (props) => {
  const navigation = useNavigation()
  const route = useRoute<ParamsProps>()
  const { item } = route.params
  const { name, url } = item

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
      headerRight: () => <ShareButton title={name} url={url} />,
      headerShadowVisible: true,
    })
  }, [navigation, name, url])

  return <Component {...props} item={item} />
}

export { Container as Detail }

const useStyles = makeStyles(useColorScheme, (colorScheme) => ({
  safeArea: styleType<ViewStyle>({
    flex: 1,
    backgroundColor: COLOR(colorScheme).BACKGROUND.PRIMARY,
  }),
  scrollView: styleType<ViewStyle>({
    flex: 1,
    backgroundColor: COLOR(colorScheme).BACKGROUND.PRIMARY,
  }),
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
