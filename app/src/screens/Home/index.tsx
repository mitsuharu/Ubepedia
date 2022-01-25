import React, { useCallback, useEffect } from 'react'
import { Text, TextStyle, useColorScheme, View, ViewStyle } from 'react-native'
import { styleType } from '@/utils/styles'
import { makeStyles } from 'react-native-swag-styles'
import { COLOR } from '@/CONSTANTS/COLOR'
import { useNavigation } from '@react-navigation/native'
import { useUbeData } from '@/database/ube'

type Props = {}
type ComponentProps = Props & {
  onPress: () => void
}

const Component: React.FC<ComponentProps> = ({ onPress }) => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <Text style={styles.text} onPress={onPress}>
        home
      </Text>
    </View>
  )
}

const Container: React.FC<Props> = (props) => {
  const navigation = useNavigation()

  const { civicFacilityList } = useUbeData()

  useEffect(() => {
    if (civicFacilityList.length > 0) {
      const [{ name }] = civicFacilityList
      console.log(`civicFacility name: ${name}`)
    }
  }, [civicFacilityList])

  const onPress = useCallback(() => {
    navigation.navigate('Detail')
  }, [navigation])

  return <Component {...props} onPress={onPress} />
}

export { Container as Home }

const useStyles = makeStyles(useColorScheme, (colorScheme) => ({
  container: styleType<ViewStyle>({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR(colorScheme).BACKGROUND.SECONDARY,
  }),
  text: styleType<TextStyle>({
    textAlign: 'center',
  }),
}))
