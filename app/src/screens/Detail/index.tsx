import React, { useLayoutEffect } from 'react'
import { ScrollView, useColorScheme, ViewStyle } from 'react-native'
import { styleType } from '@/utils/styles'
import { makeStyles } from 'react-native-swag-styles'
import { COLOR } from '@/CONSTANTS/COLOR'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { MainParams } from '@/routes/main.params'
import { ShareButton } from '@/components/Button/ShareButton'
import {
  isCivicFacility,
  isCulturalProperty,
  isSculpture,
  UbeDataType,
} from '@/database/ube/type'
import { DetailHeaderComponent } from './List/DetailHeaderComponent'
import { CivicFacilitySections } from './List/CivicFacilitySections'
import { DetailFooterComponent } from './List/DetailFooterComponent'
import { CulturalPropertySections } from './List/CulturalPropertySections'
import { SculptureSections } from './List/SculptureSections'

type ParamsProps = RouteProp<MainParams, 'Detail'>

type Props = {}
type ComponentProps = Props & {
  item: UbeDataType
}

const Component: React.FC<ComponentProps> = ({ item }) => {
  const styles = useStyles()

  return (
    <ScrollView style={styles.scrollView}>
      <DetailHeaderComponent item={item} />
      {isCivicFacility(item) && <CivicFacilitySections item={item} />}
      {isCulturalProperty(item) && <CulturalPropertySections item={item} />}
      {isSculpture(item) && <SculptureSections item={item} />}
      <DetailFooterComponent item={item} />
    </ScrollView>
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
}))
