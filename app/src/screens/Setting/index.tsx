import React, { useLayoutEffect } from 'react'
import { ScrollView, TextStyle, useColorScheme, ViewStyle } from 'react-native'
import { styleType } from '@/utils/styles'
import { makeStyles } from 'react-native-swag-styles'
import { COLOR } from '@/CONSTANTS/COLOR'
import { useNavigation } from '@react-navigation/native'
import { SettingFooterComponent } from './List/SettingFooterComponent'
import { UserSettingSection } from './List/UserSettingSection'

type Props = {}
type ComponentProps = Props & {}

const Component: React.FC<ComponentProps> = () => {
  const styles = useStyles()

  return (
    <ScrollView style={styles.scrollView}>
      <UserSettingSection />
      <SettingFooterComponent />
    </ScrollView>
  )
}

const Container: React.FC<Props> = (props) => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '設定',
    })
  }, [navigation])

  return <Component {...props} />
}

export { Container as Setting }

const useStyles = makeStyles(useColorScheme, (colorScheme) => ({
  scrollView: styleType<ViewStyle>({
    flex: 1,
    backgroundColor: COLOR(colorScheme).BACKGROUND.PRIMARY,
  }),
  text: styleType<TextStyle>({
    textAlign: 'center',
  }),
}))
